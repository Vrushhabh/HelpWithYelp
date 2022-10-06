import json
check = {}
def convertBusiness():
    '''
    CREATE TABLE businesses (
	    business_id varchar(25) PRIMARY KEY,
	    name varchar(30),
	    address varchar(65),
	    city varchar(20),
	    state varchar(15),
	    postal int,
	    longitude float(10),
	    latitude float(10),
	    stars float(10),
	    review_count int,
	    attributes varchar(1000),
	    categories varchar(1000),
	    monday  varchar(9),
	    tuesday  varchar(9),
	    wednesday  varchar(9),
	    thursday   varchar(9),
	    friday varchar(9),
	    saturday varchar(9),
	    sunday varchar(9)
    );
    '''

    locations = {}
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_business.json', 'r')
    businesses = file1.readlines()
    csv_line = ''
    count = 0

    with open('newBusinessCSV.txt', 'a') as the_file:
        for business in businesses:
            if count > 50000:
                break
            count+=1
            data = json.loads(business)

            postal = data['postal_code']
            if not postal.isdigit():
                count -= 1
                continue 
            #takes care of not including international zip codes

            longitude = data['longitude']
            latitude = data['latitude']

            #Used to commit to a one to one relation from businesses to locations table
            
            
            

            id = data['business_id']

            check[id] = 1

            name = data['name']
            address = data['address']
            city = data['city']
            state = data['state']
            
            if postal not in locations:
                locations[postal] = 1
            else:
                locations[postal] +=1
            stars = data['stars']
            review_count = data['review_count']

            if data['categories']:
                categories = data['categories'].replace(',', '')
            else:
                categories = ""

            attributes = (data['attributes'])
            attribute_string = ""
            hours = data['hours']

            if hours:
                Monday  = hours['Monday'] if 'Monday' in hours else ''
                Tuesday = hours['Tuesday'] if 'Tuesday' in hours else ''
                Wednesday = hours['Wednesday'] if 'Wednesday' in hours else ''
                Thursday = hours['Thursday'] if 'Thursday' in hours else ''
                Friday =  hours["Friday"] if 'Friday' in hours else ''
                Saturday = hours['Saturday'] if 'Saturday' in hours else ''
                Sunday = hours["Sunday"] if 'Sunday' in hours else ''
            else:
                Monday =  ''
                Tuesday =  ''
                Wednesday =  ''
                Thursday =  ''
                Friday =  ''
                Saturday =  ''
                Sunday =   ''

            if attributes and len(attributes) > 0:
                for key in attributes.keys():
                    #Only adding attributes listed if they are marked True (Every business has different attributes types and are not consistent)
                    #Could be queried using like "%attribute%"
                    if attributes[key] == 'True':
                        attribute_string += " "  + key

            csv_line = id + ',' +name +','+ address +','+city +','+ state +','+ str(postal) +','+ str(longitude) +','+ str(latitude) +','+ str(stars)  +','+str(review_count)+','+categories+',' + attribute_string + ','
            csv_line += Monday +','+ Tuesday +','+ Wednesday +','+ Thursday +','+ Friday +','+ Saturday +','+ Sunday
            the_file.write('%s\n' % csv_line)
        
        #JSON files used for keeping a log of what businesses we are using so no unnecessary reviews are added to tables
        with open('businness_locations.json','a') as log: 
            json.dump(locations, log)
        with open('business_ids.json','a') as log:
            json.dump(check, log)

    print(count)

def convertReviews():
    user_tracker = {}
    '''
    CREATE TABLE reviews (
	    review_id varchar(25) PRIMARY KEY,
	    user_id varchar(25),
	    business_id varchar(100),
	    stars int,
	    useful int,
	    funny int,
	    cool int,
	    text varchar(6000),
	    date varchar(24)
	
    );
    '''
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_review.json', 'r')
    reviews = file1.readlines()
    csv_line = ''
    count = 0

    #used to read business.json that was made to filter out unwanted businesses
    with open("data_collection/business_ids.json", encoding='utf-8', errors='ignore') as json_data:
        business_set = json.load(json_data, strict=False)
    
    
    with open('newHWYreview.txt', 'a') as the_file:
        #might need to use less businesses to reduce the amount of reviews (6 million records)
        
        for review in reviews:
            count+=1
            if count > 600000:
                break
            data = json.loads(review)
            review_id =   data['review_id']
            business_id = data['business_id']
            if business_id not in business_set:
                count-=1
                continue
            
            user_id = data['user_id']
            user_tracker[user_id] = " "
            stars = data['stars']
            useful = data['useful']
            funny = data['funny']
            cool = data['cool']
            text = data['text']
            date = data['date']
            csv_line = review_id +','+user_id + ',' + business_id +','+str(stars) +','+ str(useful) +','+str(funny)+ ','+ str(cool) +','+ text +','+ date
            the_file.write('%s\n' % csv_line)
        with open('customer_who_gave_reviews.json','a') as log: 
            json.dump(user_tracker, log)
            #might need a user.json to limit the amount of users in the user table (1.9 million users could result in load on server and querying) 
    print(count)

def convertTips():
    '''
    CREATE TABLE tips (
	    tip_id int PRIMARY KEY,
	    user_id varchar(25),
	    business_id varchar(30),
	    text varchar(3000),
	    date varchar(24),
	    compliment_count int	
    );  
    '''
    file1 = open('data_collection/yelp_academic_dataset_tip.json', 'r')
    tips = file1.readlines()
    csv_line = ''
    count = 0
    with open("data_collection/business_ids.json", encoding='utf-8', errors='ignore') as json_data:
        business_set = json.load(json_data, strict=False)
    with open("data_collection/customer_who_gave_reviews.json", encoding='utf-8', errors='ignore') as json_data:
        valid_users = json.load(json_data, strict=False)
    
    
    with open('newHWYTips.txt', 'a') as the_file:
        for tip in tips:
            count+=1
            data = json.loads(tip)
            business_id = data['business_id']
            user_id = data['user_id']
            if count > 200000:
                break

            if user_id not in valid_users:
                count -=1
                continue

            if business_id not in business_set:
                count-=1
                continue
            tip_id = count
            text = data['text']
            date = data['date']
            compliment_count = data['compliment_count']

            csv_line = str(tip_id)+','+user_id +',' + business_id + ',' + text +','+ date +',' + str(compliment_count)
            the_file.write('%s\n' % csv_line)
    print(count)

def convertUser():
    '''
    CREATE TABLE users (
	    user_id varchar(25) PRIMARY KEY,
	    name varchar(30),
	    review_count int,
	    yelping_since varchar(24),
	    useful int,
	    funny int,
	    cool int,
	    elite varchar(4)
    );
    '''

    file1 = open('data_collection/yelp_academic_dataset_user.json', 'r')
    users = file1.readlines()
    csv_line = ''
    count = 0
    with open("data_collection/customer_who_gave_reviews.json", encoding='utf-8', errors='ignore') as json_data:
        valid_users = json.load(json_data, strict=False)
    
    with open('newHWYUser.txt', 'a') as the_file:
        for user in users:
            count+=1
            if count > 250000:
                break
            data = json.loads(user)
            user_id = data['user_id']
            
            
            if user_id not in valid_users:

                count -=1
                break
            name = data['name']
            review_count = data['review_count']
            yelping_since = data['yelping_since']
            useful = data['useful']
            funny = data['funny']
            cool = data['cool']
            csv_line = user_id +','+ name+',' +str(review_count)+','+ yelping_since+ ',' + str(useful) +','+ str(funny) +','+str(cool)
            the_file.write('%s\n' % csv_line)

    print(count)
convertTips()   