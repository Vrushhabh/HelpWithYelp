import requests
import json
import pandas as pd

with open("businness_locations.json", encoding='utf-8', errors='ignore') as json_data:
        business_set = json.load(json_data, strict=False)
    
with open('weatherperzipcode.json', 'a') as the_file:
    
    for i in business_set.keys():
        try:
            zip_code = i
            url = "https://www.melissa.com/v2/lookups/zipclimate/zipcode/?zipcode=" + str(zip_code) + "&fmt=json&id=FWK8s3tKE4l-3Hm41qrQJq**nSAcwXpxhQ0PC2lXxuDAZ-**"
            request = requests.request('GET',url)
            json_ = request.json()

            months = json_['Records']
            for month in months:
                postal = month['Zip']
                month_name = month['MonthName']
                AvgTemp = month['AvgTemp']
                HighTemp = month['HighTemp']
                LowTemp = month['LowTemp']
                Rain = month['Rain']
                csv_line = str(postal) +','+ month_name+',' +str(AvgTemp)+','+ str(HighTemp)+ ',' + str(LowTemp) +','+ str(Rain) 
                the_file.write('%s\n' % csv_line)
        except:
            continue

     

df = pd.read_csv("weatherperzipcode.json")
df.insert(0, 'int_d', range(1, len(df) + 1))
df.to_csv("WeatherPerZipCode.csv", index=False)






     
   
    
  





# print(response.json())