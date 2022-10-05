import json
check = {}
def convertBusiness():
    locations = {}
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_business.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    with open('BusinessCSV.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)

            longitude = data['longitude']
            latitude = data['latitude']

            if str(longitude) + "," +str(latitude) in locations:
                count -=1
                continue
            str_location = str(longitude) +','+ str(latitude)
            locations[str_location] = 1

            id = data['business_id']

            check[id] = 1

            name = data['name']
            address = data['address']
            city = data['city']
            state = data['state']
            postal = data['postal_code']
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
                    if attributes[key] == 'True':
                        attribute_string += " "  + key

            data_string = id + ',' +name +','+ address +','+city +','+ state +','+ str(postal) +','+ str(longitude) +','+ str(latitude) +','+ str(stars)  +','+str(review_count)+','+categories+',' + attribute_string + ','
            data_string += Monday +','+ Tuesday +','+ Wednesday +','+ Thursday +','+ Friday +','+ Saturday +','+ Sunday
            the_file.write('%s\n' % data_string)

        with open('businness_locations.json','a') as log:
            json.dump(locations, log)
        with open('business_ids.json','a') as log:
            json.dump(check, log)

    print(count)

def convertReviews():
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_review.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    with open("data_collection/business_ids.json", encoding='utf-8', errors='ignore') as json_data:
        business_set = json.load(json_data, strict=False)
    
    
    with open('HWYreview.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)
            review_id = data['review_id']
            user_id = data['user_id']
            business_id = data['business_id']
            if business_id not in business_set:
                count-=1
                continue
            stars = data['stars']
            useful = data['useful']
            funny = data['funny']
            cool = data['cool']
            text = data['text']
            date = data['date']
            data_string = review_id +','+user_id + ',' + business_id +','+str(stars) +','+ str(useful) +','+str(funny)+ ','+ str(cool) +','+ str(text) +','+ str(date)
            the_file.write('%s\n' % data_string)
    print(count)

def convertTips():
    file1 = open('data_collection/yelp_academic_dataset_tip.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    with open("data_collection/business_ids.json", encoding='utf-8', errors='ignore') as json_data:
        business_set = json.load(json_data, strict=False)
    
    
    with open('HWYTips.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)
            user_id = data['user_id']
            business_id = data['business_id']
            if business_id not in business_set:
                count-=1
                continue
            tip_id = count
            text = data['text']
            date = data['date']
            compliment_count = data['compliment_count']

            data_string = str(tip_id)+','+user_id +',' + business_id + ',' + str(text) +','+ str(date) +',' + str(compliment_count)
            the_file.write('%s\n' % data_string)
    print(count)

def convertUser():
    file1 = open('data_collection/yelp_academic_dataset_user.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    '''
    user_id varchar(25) PRIMARY KEY,
	name varchar(30),
	review_count int,
	yelping_since varchar(24),
	useful int,
	funny int,
	cool int,
	elite varchar(4)
    '''
    with open('HWYUser.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)
            user_id = data['user_id']
            name = data['name']
            review_count = data['review_count']
            yelping_since = data['yelping_since']
            useful = data['useful']
            funny = data['funny']
            cool = data['cool']
            elite = data['elite']
            data_string = user_id +','+ name+',' +review_count+','+ yelping_since+ ',' + str(useful) +','+ str(funny) +',' +str(cool)+','+ str(elite)
            the_file.write('%s\n' % data_string)
    print(count)

convertUser()
    




