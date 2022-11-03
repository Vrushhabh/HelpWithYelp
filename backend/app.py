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
@app.route('/reviewsFromBusiness/<postal>', methods=["GET"])
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

    #append each review into 
    for x in myresult:
      json_data.append(dict(zip(row_headers,x)))

    return json.dumps(json_data)
      

   
    
