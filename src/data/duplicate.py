import json

with open('./skaters.json') as f:
  skaterData = json.load(f)


cleaned = []
for skater in skaterData['athletes']:
    exist = False
    for item in cleaned:
        if item['athlete'] == skater['athlete']:
            print("DUPLICATE:")
            print(skater)
            exist = True
            if 'partner' in item:
                if isinstance(item['partner'], list):
                    item['partner'].append(skater['partner'])
                else:
                    item['partner'] = [item['partner'], skater['partner']]
            for competition in skater['competitions']:
                item['competitions'].append(competition)
    if exist == False:
        del skater['medal count']
        del skater['medal details']
        cleaned.append(skater)
print(skaterData)
newJSON = {
    "athletes": cleaned
}
jsonString= json.dumps(newJSON)
jsonFile = open("skatersNew.json", "w")
jsonFile.write(jsonString)
jsonFile.close()
    

            