import wikipedia
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import numpy as np
import json

skaterProfile = {'pb': []}


page = wikipedia.page("Karen Chen")
print(page.summary)
response = requests.get(
    url= page.url ,
)
soup = BeautifulSoup(response.content, 'html.parser')

for row in soup.find('table', class_="infobox vcard").tbody.findAll('tr'):
    header = row.find('th')

    #GETTTING WORLD STANDING
    if(header is not None and not isinstance(header.contents[0], NavigableString)): 
        if(len(header.contents) == 1 and header.contents[0].contents[0] == 'World standing'):
            print("RANK")
            #print(row)
            print(row.find("td").contents)
            rank = row.find("td").contents[0] 
            if(isinstance(row.find("td").contents[0], NavigableString)):
                rank = row.find("td").contents[0]
                date = row.find("td").contents[1].contents[0]
                print(date)
                print("HERE 1")
                print(rank)
            else:
                rank =  row.find("td").contents[0].contents[0]
                print(rank)
                if(isinstance(row.find("td").contents[2], NavigableString)):
                    date = row.find("td").contents[2]
                elif(isinstance(row.find("td").contents[2].contents[0], NavigableString)):
                    date = row.find("td").contents[2].contents[0]
                else:
                    date = row.find("td").contents[2].contents[0].contents[0]
                print(date)
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
            
            print(list)





# bio = []
# for sentence in page.summary.split('\n'):
#     if(len(sentence.strip()) > 0):
#         bio.append(sentence.strip())
# skaterProfile['bio'] = bio
# # print(wikipedia.summary("Tessa Virtue"))
# print(page.url)
# # print(page.content)

# response = requests.get(
#     url= page.url ,
# )
# soup = BeautifulSoup(response.content, 'html.parser')


# bday = soup.find("span", class_="ForceAgeToShow")
# skaterProfile['age'] = bday.contents[0].partition('age')[-1].replace('\xa0', '').replace(')', '')

# photo = soup.find('td', class_="infobox-image")
# skaterProfile['img'] = "https:" + photo.find('img')['src']

# for row in soup.find('table', class_="infobox vcard").tbody.findAll('tr'):
#     header = row.find('th')

#     #GETTTING WORLD STANDING
#     if(header is not None and not isinstance(header.contents[0], NavigableString)): 
#         if(len(header.contents) == 1 and header.contents[0].contents[0] == 'World standing'):
#             rank = row.find("td").contents[0].contents[0]
#             if(isinstance(row.find("td").contents[2].contents[0], NavigableString)):
#                 date = row.find("td").contents[2].contents[0]
#             else:
#                 date = row.find("td").contents[2].contents[0].contents[0]
#             skaterProfile['standing'] = [rank, date.replace('\xa0', ' ')]
#     if(header is not None and isinstance(header.contents[0], NavigableString)):
#         #GET BIRTHDAY
#         if header.contents[0] == 'Born':
#            skaterProfile['DOB'] = row.contents[1].contents[1]
        
#         #GET PERSONAL BESTS
#         if header.contents[0] in ['Combined total', 'Short program', 'Free skate']:
#             skaterProfile['pb'].append([header.contents[0], row.find("td").contents[0].partition(' ')[0]])
        
#         #COACH, CHOREO, CLUB, BEGAN SKATING
#         if header.contents[0] in ['Coach', 'Choreographer', 'Skating club', 'Began skating']:
#             table = row.find("td")
#             list = []
#             if(len(table.contents) == 1 and (table.find("div", class_="plainlist") is not None)): #if organized as a list
#                 contents = table.find_all("li")
#                 for li in contents:
#                     string = ''
#                     for content in li.contents:
#                         if(isinstance(content, NavigableString)):
#                             if(len(content.replace(',', '').strip()) != 0):
#                                 string += content.replace(',', '').strip() + ' '
#                         else:
#                             if(len(content.contents) != 0):
#                                 string += content.contents[0].replace(',', '').strip() + ' '
#                     list.append(string.strip())
#             else: #if separated by commas 
#                 for content in table.contents:
#                     if(isinstance(content, NavigableString)):
#                         if(len(content.replace(',', '').strip()) != 0):
#                             list.append(content.replace(',', '').strip())
#                     else:
#                         if(len(content.contents) != 0):
#                             list.append(content.contents[0].replace(',', ''))
#             skaterProfile[header.contents[0]] = list
            
# print(skaterProfile)

        



   
