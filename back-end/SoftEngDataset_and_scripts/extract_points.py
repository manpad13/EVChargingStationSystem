import json
import random

points_in = open("./poi.json", 'r',encoding="utf8")
points_out = open("./points2.json", 'w')

countries = ['Germany', 'Italy', 'France', 'Greece', 'Belgium']
stationIDs = [i for i in range(500)]
dataProvider = [(1,"Open Charge Map Contributors"),(2,"afdc.energy.gov"),(7,"Mobie.pt"),(8,"ev-charging.com"),(13,"www.uppladdning.nu"),(14,"e-Laad"),(15,"CarStations.com"),(17,"BlinkNetwork.com"),(18,"UK National Charge Point Registry"),(19,"NOBIL"),(20,"Chargepoint.net"),(21,"RWE Mobility"),(22,"CHAdeMO.com"),(23,"ESB eCars"),(24,"AddÉnergie Technologies Inc."),(27,"Place To Plug"),(28,"data.gouv.fr")]
total = 0

for line in points_in:
  if total == 1900:
    break

  p = json.loads(line)
  point = {}
  point['pointID'] = p['_id']['$oid']
  point['stationID'] = random.choice(stationIDs)
  
  if p['OperatorInfo'] is not None:
    point['operator'] = p['OperatorInfo']['Title']
  else:
    continue
    
  point['costPerKWh'] = random.randint(1, 10)/10
  
  point['location'] = {}
  if p['AddressInfo']['Country']['Title'] in countries:
    point['location']['address'] = p['AddressInfo']['AddressLine1']
    point['location']['country'] = p['AddressInfo']['Country']['Title']
    lat = p['AddressInfo']['Latitude']
    lon = p['AddressInfo']['Longitude']
    geo = {'type': "Point", 'coordinates': [lon, lat]}
    point['location']['geo'] = geo
  else:
    continue
  point['connections'] = p['Connections']
  
  provider = random.choice(dataProvider)
  point['providerID'] = provider[0]
  point['providerName'] = provider[1]
  total += 1
  string = json.dumps(point)
  points_out.write(string + "\n")
  
points_in.close()
points_out.close()
