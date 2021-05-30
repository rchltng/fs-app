import json

with open('./skaters.json') as f:
  skaterData = json.load(f)

for skater in skaterData['athletes']:
    print(skater['athlete'])
    seasons = skater['competitions']
    achievements = []
    gold = 0
    silver = 0
    bronze = 0
    for season in seasons:
        for comp in season['competitions']:
            if(comp[4].strip() == '1' or comp[4].strip() == '1P' or comp[4].strip == '1T'):
                medal = "🥇"
                gold+=1
                if(comp[4].strip() == '1P' or comp[4].strip == '1T'):
                    discipline = "Team"
                else: 
                    discipline = skater['discipline']
                medalSeason = season['season']
                medalData = [medal, medalSeason, discipline]
                exist = False
                for event in achievements:
                    if event["event"] == comp[0].strip():
                        exist = True
                        event["medals"].append(medalData)
                if(exist is False):
                    newEvent = {
                        'event': comp[0].strip(),
                        'medals': [medalData]
                    }
                    achievements.append(newEvent)
                    
            if(comp[4].strip() == '2' or comp[4].strip() == '2P' or comp[4].strip == '2T'):
                medal = "🥈"
                silver += 1
                if(comp[4].strip() == '2P' or comp[4].strip == '2T'):
                    discipline = "Team"
                else: 
                    discipline = skater['discipline']
                medalSeason = season['season']
                medalData = [medal, medalSeason, discipline]

                exist = False
                for event in achievements:
                    if event["event"] == comp[0].strip():
                        exist = True
                        event["medals"].append(medalData)
                if(exist is False):
                    newEvent = {
                        'event': comp[0].strip(),
                        'medals': [medalData]
                    }
                    achievements.append(newEvent)
            if(comp[4].strip() == '3' or comp[4].strip() == '3P' or comp[4].strip == '3T'):
                medal = "🥉"
                bronze += 1
                if(comp[4].strip() == '3P' or comp[4].strip == '3T'):
                    discipline = "Team"
                else: 
                    discipline = skater['discipline']
                medalSeason = season['season']
                medalData = [medal, medalSeason, discipline]
            
                exist = False
                for event in achievements:
                    if event["event"] == comp[0].strip():
                        exist = True
                        event["medals"].append(medalData)
                if(exist is False):
                    newEvent = {
                        'event': comp[0].strip(),
                        'medals': [medalData]
                    }
                    achievements.append(newEvent)
            
    skater['medal details'] = achievements
    skater['medal count'] = [gold, silver, bronze]
    print(skater['medal details'])
    print(skater['medal count'])
            
    
# print(skaterData)
jsonString= json.dumps(skaterData)
jsonFile = open("skatersNew.json", "w")
jsonFile.write(jsonString)
jsonFile.close()
    