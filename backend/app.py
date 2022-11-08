from flask import Flask
import mysql.connector
import json
app = Flask(__name__)
dataBase = mysql.connector.connect(
        host="35.193.38.77",
        user="root",
        password="Vrushhabhpa1234+",
        database='HelpWithYelp2')


#get reviews from businesses in same zip code that operate well
@app.route('/reviews-from-zip/<postal>', methods=["GET"])
def get_reviews_via_zip(postal):
    query_str1 = "SELECT review_id, text, user_id, business_id, name, review_stars,stars, useful FROM reviews INNER JOIN (SELECT * FROM businesses where postal = "
    postal_arg = str(postal)
    query_str2 = " and stars >= "
    stars_arg = str(3.5) + ")"
    query_str3 = str(" as b using(business_id)")

    query = query_str1 + postal_arg + query_str2 + stars_arg + query_str3
    

    mycursor = dataBase.cursor()
    mycursor.execute(query) 

    # make json keys to send to frontend
    row_headers=[x[0] for x in mycursor.description] 
    myresult = mycursor.fetchall()
    json_data=[]

    #append each review into json data
    for x in myresult:
      json_data.append(dict(zip(row_headers,x)))

    return json.dumps(json_data)
      

# get the number of categories from each zip postal code
@app.route('/categories-from-zip/<postal>', methods=["GET"])
def get_num_of_categories(postal):
   
    query_str1 = "SELECT a.category, count(a.category) FROM (SELECT * FROM businesses where stars >= 3 and postal ="
    postal_arg = str(postal) + ")"
    query_str2 = " as b inner join (Select * FROM categories1 where business_id in (Select business_id from categories1 where category = 'Restaurants') ) a using (business_id) group by a.category order by count(a.category) desc"

    query = query_str1 + postal_arg + query_str2 
    #make cursor to iterate through table
    mycursor = dataBase.cursor()
    mycursor.execute(query) 

    # make json keys that correspond with queried  to send to frontend
    row_headers=[x[0] for x in mycursor.description] 
    myresult = mycursor.fetchall()
    json_data=[]

    #append each review into json data
    for x in myresult:
      json_data.append(dict(zip(row_headers,x)))

    return json.dumps(json_data)
          
# get the number of categories from each zip postal code
@app.route('/delete-unhelpful-review/<review_id>', methods=["GET"]) #change to post
def delete_review(review_id):
    query_str1 = "DELETE FROM reviews WHERE "
    reviewid_arg = "reviews.review_id like " +" '" + str(review_id) +"'"
    query = query_str1 + reviewid_arg
    mycursor = dataBase.cursor()
    mycursor.execute(query) 
    print(query)

    return "successfully deleted"




   


          