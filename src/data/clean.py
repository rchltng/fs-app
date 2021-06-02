import json
import math

with open('./skaters.json') as f:
  skaterData = json.load(f)

with open('./country.json') as f:
  countryData = json.load(f)

men = False
menRank = 1
ladies = False
ladiesRank = 1
pairs = False
pairsRank = 0
id = False
idRank = 0

for skater in skaterData['athletes']:
    # print(skater['discipline'])
    if skater['discipline'] == "men's singles":
      print("hello")
      skater['rank'] = menRank
      print(skater['rank'])
      menRank += 1
    elif skater['discipline'] == "ladies' singles":
      skater['rank'] = ladiesRank
      ladiesRank += 1
    elif skater['discipline'] == 'pairs':
      skater['rank'] = (pairsRank//2) + 1
      pairsRank +=1
    elif skater['discipline'] == 'ice dance':
      skater['rank'] = (idRank//2) + 1 
      idRank += 1
    # print(skater['representing'])
    # for country in countryData:
    #     if country['Country'] == skater['representing']:
    #         skater['countryCode'] = country['Alpha-2 code']

# for skater in skaterData['athletes']:
#     competitions = skater['competitions']
#     for comp in competitions:
#         test = comp['season'].split('/')
#         test1 = test[0][:2]
#         test[1] = test[0][:2] + test[1] 
#         comp['season'] = test[0] + '-' + test[1]
#         print(comp['season'])

# for skater in skaterData['athletes']:
#     print(skater['athlete'])
#     seasons = skater['competitions']
#     achievements = []
#     gold = 0
#     silver = 0
#     bronze = 0
#     for season in seasons:
#         for comp in season['competitions']:
#             if(comp[4].strip() == '1' or comp[4].strip() == '1P' or comp[4].strip == '1T'):
#                 medal = "🥇"
#                 gold+=1
#                 if(comp[4].strip() == '1P' or comp[4].strip == '1T'):
#                     discipline = "Team"
#                 else: 
#                     discipline = skater['discipline']
#                 medalSeason = season['season']
#                 medalData = [medal, medalSeason, discipline]
#                 exist = False
#                 for event in achievements:
#                     if event["event"] == comp[0].strip():
#                         exist = True
#                         event["medals"].append(medalData)
#                 if(exist is False):
#                     newEvent = {
#                         'event': comp[0].strip(),
#                         'medals': [medalData]
#                     }
#                     achievements.append(newEvent)
                    
#             if(comp[4].strip() == '2' or comp[4].strip() == '2P' or comp[4].strip == '2T'):
#                 medal = "🥈"
#                 silver += 1
#                 if(comp[4].strip() == '2P' or comp[4].strip == '2T'):
#                     discipline = "Team"
#                 else: 
#                     discipline = skater['discipline']
#                 medalSeason = season['season']
#                 medalData = [medal, medalSeason, discipline]

#                 exist = False
#                 for event in achievements:
#                     if event["event"] == comp[0].strip():
#                         exist = True
#                         event["medals"].append(medalData)
#                 if(exist is False):
#                     newEvent = {
#                         'event': comp[0].strip(),
#                         'medals': [medalData]
#                     }
#                     achievements.append(newEvent)
#             if(comp[4].strip() == '3' or comp[4].strip() == '3P' or comp[4].strip == '3T'):
#                 medal = "🥉"
#                 bronze += 1
#                 if(comp[4].strip() == '3P' or comp[4].strip == '3T'):
#                     discipline = "Team"
#                 else: 
#                     discipline = skater['discipline']
#                 medalSeason = season['season']
#                 medalData = [medal, medalSeason, discipline]
            
#                 exist = False
#                 for event in achievements:
#                     if event["event"] == comp[0].strip():
#                         exist = True
#                         event["medals"].append(medalData)
#                 if(exist is False):
#                     newEvent = {
#                         'event': comp[0].strip(),
#                         'medals': [medalData]
#                     }
#                     achievements.append(newEvent)
            
#     skater['medal details'] = achievements
#     skater['medal count'] = [gold, silver, bronze]          
#print(skaterData)
jsonString= json.dumps(skaterData)
jsonFile = open("skatersNew.json", "w")
jsonFile.write(jsonString)
jsonFile.close()
    