import json

with open('./skaters.json') as f:
  skaterData = json.load(f)

with open('./country.json') as f:
  countryData = json.load(f)

for skater in skaterData['athletes']:
    # print(skater['representing'])
    for country in countryData:
        if country['code'] == skater['representing']:
            skater['representing'] = country['name']
            skater['countryCode'] = country['code']
            
print(skaterData)
jsonString= json.dumps(skaterData)
jsonFile = open("skatersNew.json", "w")
jsonFile.write(jsonString)
jsonFile.close()
    