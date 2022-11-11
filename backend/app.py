from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
dataBase = mysql.connector.connect(
        host="35.193.38.77",
        user="root",
        password="Vrushhabhpa1234+",
        database='HelpWithYelp2')


#get reviews from businesses in same zip code that operate well
@app.route('/reviews-from-zip/<postal>', methods=["GET"], strict_slashes=False)
def get_reviews_via_zip(postal):
    query_str1 = "SELECT * FROM reviews INNER JOIN (SELECT * FROM businesses where postal = "
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
    dataBase.commit()
    

    return json.dumps(json_data)
      

# get the number of categories from each zip postal code
@app.route('/categories-from-zip/<postal>', methods=["GET"], strict_slashes=False)
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
    dataBase.commit()
    

    


    return json.dumps(json_data)
           
# get the number of categories from each zip postal codef
@app.route('/delete-unhelpful-review/<review_id>', methods=["GET"], strict_slashes=False) #change to post
def delete_review(review_id):
    query_str1 = "DELETE FROM reviews WHERE "
    reviewid_arg = "reviews.review_id like " +" '" + str(review_id) +"'"
    query = query_str1 + reviewid_arg
    mycursor = dataBase.cursor()
    mycursor.execute(query) 
    dataBase.commit()
    

    return "successfully deleted"


# change a schedule of a wrong time 
@app.route('/change-hours/<business_id>/<day>/<start_time>/<end_time>', methods=["GET"], strict_slashes=False) #change to post
def change_schedule(business_id,day,start_time,end_time):
    start_time2 = start_time.split(":")
    end_time2 = end_time.split(":")

    if int(start_time2[0]) > int(end_time2[0]):
      return "start time is after end time Code: 400"

    query_str1 = "UPDATE businesses "
    time_arg = "SET " +day + " " +"= " +"'"+start_time + '-'+end_time+"'"
    business_arg = "WHERE business_id = " + "'"+business_id+"'"
    
    query = query_str1 + time_arg +" "+  business_arg + ";"
    mycursor = dataBase.cursor()
    mycursor.execute(query) 
    dataBase.commit()

    return "successfully changed 200"



# change a schedule of a wrong time 
@app.route('/add-business/<name>/<postal>/<state>/<categories>', methods=["GET"], strict_slashes=False) #change to post
def add_business(name,postal,state,categories):

  """INSERT INTO table_name (column1, column2, rcolumn3, ...)
    VALUES (value1, value2, value3, ...);"""
  new_count= 0
  with open("counter.txt") as f:
    lines = f.readlines()
    print(lines)
    lines[0] =  int(lines[0]) + 1
    print(lines[0])

  query_str1 = "INSERT INTO businesses (business_id,name,postal,state,categories) VALUES (%s, %s,%s, %s,%s)"
  val = (str(lines[0]),name, (postal),state, categories)
 
  print(val)
  mycursor = dataBase.cursor()
  mycursor.execute(query_str1,val) 
  dataBase.commit()
  
  myresult = mycursor.fetchall()
  print(myresult)
  with open("counter.txt", "w") as f:
      f.writelines(str(lines[0]))

    
  return "successfully changed 200"