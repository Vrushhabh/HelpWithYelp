import json

def convertBuisness():
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_business.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    with open('somefile.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)
            id = data['business_id']
            name = data['name']
            address = data['address']
            city = data['city']
            state = data['state']
            postal = data['postal_code']
            longitude = data['longitude']
            latitude = data['latitude']
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
    print(count)

def convertReviews():
    file1 = open('/Users/vrushhabh/Downloads/Yelp_datasets/yelp_academic_dataset_review.json', 'r')
    lines = file1.readlines()
    data_string = ''
    count = 0
    with open('HWYreview.txt', 'a') as the_file:
        for line in lines:
            count+=1
            data = json.loads(line)
            review_id = data['review_id']
            user_id = data['user_id']
            business_id = data['business_id']
            stars = data['stars']
            useful = data['useful']
            cool = data['cool']
            text = data['text']
            date = data['date']
            data_string = review_id +','+user_id + ',' + business_id +','+str(stars) +','+ str(useful) +','+ str(cool) +','+ str(text) +','+ str(date)
            the_file.write('%s\n' % data_string)
    print(count)

convertReviews()