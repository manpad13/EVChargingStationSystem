import json
import random

"""
events_in = open("data/caltech_acndata_sessions_12month.json", 'r')

tmp = json.load(events_in)
data = tmp['_items']

userIDs = []
for e in data:
  if e['userID'] is not None:
    userIDs.append(e['userInputs'][0]['userID'])
    
events_in.close()
"""

vehicles_in = open("data/electric_vehicles_data.json", 'r')
vehicles_out = open("final-data/vehicles.json", 'w')

tmp = json.load(vehicles_in)
data = tmp['data']

userIDs = [id for id in range(50)]

for v in data:
  vehicle = {}
  vehicle['_id'] = v['id']
  vehicle['userID'] = random.choice(userIDs)
  vehicle['brand'] = v['brand']
  vehicle['type'] = v['type']
  vehicle['model'] = v['model']
  vehicle['consumption'] = v['energy_consumption']['average_consumption']
  
  string = json.dumps(vehicle)
  vehicles_out.write(string + "\n")
  
vehicles_in.close()
vehicles_out.close()
