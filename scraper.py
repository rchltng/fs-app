import wikipedia
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import numpy as np
import json

def skaterBio(page, skaterProfile, skaterBios):
    bio = []
    for sentence in page.summary.split('\n'):
        if(len(sentence.strip()) > 0):
            bio.append(sentence.strip())
    if(bio == []):
        return
    skaterProfile['bio'] = bio
    # print(wikipedia.summary("Tessa Virtue"))
    print(page.url)
    # print(page.content)

    response = requests.get(
        url= page.url ,
    )
    soup = BeautifulSoup(response.content, 'html.parser')

    bday = soup.find("span", class_="ForceAgeToShow")
    # if bday is None and skater[0] == "Denis Ten":
    #     skaterProfile['age'] = 25
    if bday is None:
        return
    else:
        skaterProfile['age'] = bday.contents[0].partition('age')[-1].replace('\xa0', '').replace(')', '')

    #  GET HIGHEST QUALITY IMAGE
    photo = soup.find('td', class_="infobox-image")
    if(photo is None):
        return
    photoHref = photo.find('a')['href']
    photoHref = requests.get(
        url= 'https://en.wikipedia.org' + photoHref ,
    )
    photoHref = BeautifulSoup(photoHref.content, 'html.parser')
    
    imageDiv = photoHref.find('div', class_="fullImageLink")
    # print(imageDiv)
    # print(imageDiv.contents)
    skaterProfile['img'] = "https:" + imageDiv.find('img')['src']
    # print(skaterProfile['img'])
    for row in soup.find('table', class_="infobox vcard").tbody.findAll('tr'):
        header = row.find('th')
        #GETTTING WORLD STANDING
        if(header is not None and not isinstance(header.contents[0], NavigableString)): 
            if(len(header.contents) == 1 and header.contents[0].contents[0] == 'World standing'):
                if(isinstance(row.find("td").contents[0], NavigableString)):
                    rank = row.find("td").contents[0]
                    date = row.find("td").contents[1].contents[0]
                else:
                    rank =  row.find("td").contents[0].contents[0]
                    if(isinstance(row.find("td").contents[2], NavigableString)):
                        date = row.find("td").contents[2]
                    elif(isinstance(row.find("td").contents[2].contents[0], NavigableString)):
                        date = row.find("td").contents[2].contents[0]
                    else:
                        date = row.find("td").contents[2].contents[0].contents[0]
                skaterProfile['standing'] = [rank, date.replace('\xa0', ' ')]
        if(header is not None and isinstance(header.contents[0], NavigableString)):
            #GET BIRTHDAY
            if header.contents[0] == 'Born':
                skaterProfile['dob'] = row.contents[1].contents[1]
            
            if header.contents[0] == 'Retired':
                skaterProfile['retired'] = row.contents[1].contents[0]
            #GET PERSONAL BESTS
            if header.contents[0] in ['Combined total', 'Short program', 'Free skate']:
                skaterProfile['pb'].append([header.contents[0], row.find("td").contents[0].partition(' ')[0]])
            
            #COACH, CHOREO, CLUB, BEGAN SKATING
            if header.contents[0] in ['Coach', 'Choreographer', 'Skating club', 'Began skating', 'Former coach', 'Former choreographer']:
                print(header.contents[0])
                table = row.find("td")
                list = []
                if(len(table.contents) == 1 and (table.find("div", class_="plainlist") is not None)): #if organized as a list
                    contents = table.find_all("li")
                    for li in contents:
                        string = ''
                        for content in li.contents:
                            if(isinstance(content, NavigableString)):
                                if(len(content.replace(',', '').strip()) != 0):
                                    string += content.replace(',', '').strip() + ' '
                            else:
                                if(len(content.contents) != 0):
                                    string += content.contents[0].replace(',', '').strip() + ' '
                        list.append(string.strip())
                else: #if separated by commas 
                    for content in table.contents:
                        if(isinstance(content, NavigableString)):
                            if(len(content.replace(',', '').strip()) != 0):
                                list.append(content.replace(',', '').strip())
                        else:
                            if(content.contents is not None and len(content.contents) != 0):
                                if(isinstance(content.contents[0], NavigableString)):
                                    for innerContent in content.contents[0].split(','):
                                        if(len(innerContent.strip()) > 0):
                                            list.append(innerContent.strip())
                skaterProfile[header.contents[0]] = list      
    print(skaterProfile)
    skaterBios.append(skaterProfile)


disciplines = {'pairs': [], 'dance': []}

for discipline in disciplines:
    # print(discipline)
    response = requests.get(
        url='https://www.skatingscores.com/q/event/?show_ranks=on&underline=&season_codes=all&division_codes=sr&division_codes=jr&event_codes=major&discipline_codes=' + discipline + '&unit_country_codes=all&unit_name=%25&distinct_unit=on&sort=score&limit=100&submit=Submit'
        #url="https://www.skatingscores.com/" + discipline + "/" ,
    )
    soup = BeautifulSoup(response.content, 'html.parser')

    #for row in soup.find('table', class_="stab").tbody.findAll('tr')[2:]:
    for row in soup.find('table', class_="qtab").tbody.findAll('tr')[1:]:
        # print(row)
        flag = row.find("td", class_="uflag").contents[0]['href'].replace('/', '').upper()
        name = row.find("td", class_="unit_a_last_name").contents[0].contents[0] #NOTE: SECOND IS NATIONALITY
        href = row.find("td", class_="unit_a_last_name").contents[0]['href']
        disciplines[discipline].append([name, href, flag])
# print(disciplines)

# men = disciplines['men']
# test = [skater[1] for skater in men]
# print(test)
allSkater = {};
skaterBios = []

for discipline in disciplines:
    for skater in disciplines[discipline]:
        skaterProfile = {'pb': []}
        print(discipline)
        print(skater[0])
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

        skaterProfile["athlete"] = skater[0]
        skaterProfile["representing"] = skater[2]
        if(discipline == "pairs"):
            skaterProfile['discipline'] = "pairs"
        elif(discipline == "dance"):
            skaterProfile['discipline'] = "ice dance"
        skaterProfile["competitions"] = competitions
        athlete = skater[0]
        #print("athlete: " + skater[0])

        if(skater[2] == "CHN"):
            athlete = " ".join(reversed(skater[0].split(" ")))
        try:
            page = wikipedia.page(athlete, auto_suggest=False, redirect=True)
            skaterBio(page, skaterProfile, skaterBios)
        except (wikipedia.exceptions.DisambiguationError) as e:
            page = wikipedia.page(athlete +  " (figure skater)")
            skaterBio(page, skaterProfile, skaterBios)
        except (wikipedia.exceptions.PageError) as e:
            pass
        
        

skaterBios = {
    'athletes': skaterBios
}

jsonString= json.dumps(skaterBios)
jsonFile = open("skatersPAIRS.json", "w")
jsonFile.write(jsonString)
jsonFile.close()
