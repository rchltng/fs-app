import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import numpy as np
import json

disciplines = {'men': [], 'ladies': [], 'dance': [], 'pairs': []}

for discipline in disciplines:
    # print(discipline)
    response = requests.get(
        url="https://www.skatingscores.com/" + discipline + "/" ,
    )
    soup = BeautifulSoup(response.content, 'html.parser')


    for row in soup.find('table', class_="stab").tbody.findAll('tr')[2:]:
        if(discipline == "men" or discipline == "ladies"):
            name = row.contents[2].find("span").contents[0] #NOTE: SECOND IS NATIONALITY
        else:
            #partners have two names for ice dance / pairs 
            name = row.contents[2].find("span").contents
            p1 = name[0].contents[0] 
            p2 = name[2].contents[0]
            name = p1 + "/" + p2
            # name = name[0].contents + name[1] + name[2].contents
        href = row.contents[2].find("a")['href']
        disciplines[discipline].append([name, href])
# print(disciplines)

# men = disciplines['men']
# test = [skater[1] for skater in men]
# print(test)

skaterBios = []

for discipline in disciplines:
    for skater in disciplines[discipline]:
        # print("skater: ")
        # print(skater)
        competitions = []
        response = requests.get(
            url="https://www.skatingscores.com" + skater[1],
        )
        skaterHistory = BeautifulSoup(response.content, 'html.parser')

        seasons = skaterHistory.find_all("table", class_="event-grid stab")

        for season in seasons[1:]: 
            year = season.find("tr", class_="group-row").findAll(True, {'colspan':['5', '6']})

            year = year[0].contents[0]; #get year
            events = season.find_all("tr")
            list = []
            for event in events[2:]: #table
                href = event.find("td", class_="event-title").find("a")['href']
                eventUrl = requests.get(
                    url="https://www.skatingscores.com/" + href
                )
                eventPage = BeautifulSoup(eventUrl.content, 'html.parser')
                eventName = eventPage.find("h1").find("a").contents[0]

                scores = event.find_all("td", class_="c")[-3:]
                sp = scores[0]
                if(len(sp.contents) != 4):
                    sp_score = "-"
                else:
                    sp_score = sp.contents[3].contents[0]

                fs = scores[1]
                if(len(fs.contents) != 4):
                    fs_score = "-"
                else:
                    fs_score = fs.contents[3].contents[0]

                total = scores[2]
                if(len(total.contents) == 1):
                    total_score = "-"
                    if(isinstance(total.contents[0], NavigableString)):
                        rank = total.contents[0]
                    else:
                        rank = total.contents[0].contents[0]
                elif(len(total.contents) == 4):
                    total_score = total.contents[3].contents[0]
                    rank = total.contents[0]
                list.append([eventName, sp_score, fs_score, total_score, rank])
            currentSeason = {
                "season": year,
                "competitions": list
            }
            competitions.append(currentSeason)

        skaterBio = {
            "name": skater[0],
            "competitions": competitions
        }
        skaterBios.append(skaterBio)


jsonString= json.dumps(skaterBios)
jsonFile = open("skaters.json", "w")
jsonFile.write(jsonString)
jsonFile.close()






