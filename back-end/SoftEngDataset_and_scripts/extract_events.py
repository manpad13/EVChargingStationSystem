import json
import random

vehicles_in = open("final-data/vehicles.json")
vehicleIDs = []
for line in vehicles_in:
  v = json.loads(line)
  vehicleIDs.append(v['_id'])
vehicles_in.close()

points_in = open("final-data/points.json")
pointIDs = []
for line in points_in:
  p = json.loads(line)
  pointIDs.append(p['pointID'])
points_in.close()

### 

events_in = open("data/caltech_acndata_sessions_12month.json", 'r')
events_out = open("final-data/events.json", 'w')

tmp = json.load(events_in)
data = tmp['_items']


def month_to_number(month):
  if month == 'Jan':
    return '01'
  if month == 'Feb':
    return '02'
  if month == 'Mar':
    return '03'
  if month == 'Apr':
    return '04'
  if month == 'May':
    return '05'
  if month == 'Jun':
    return '06'
  if month == 'Jul':
    return '07'
  if month == 'Aug':
    return '08'
  if month == 'Sep':
    return '09'
  if month == 'Oct':
    return '10'
  if month == 'Nov':
    return '11'
  if month == 'Dec':
    return '12'


def convert_date(date):
  tokens = date.split(' ')
  new_date = ''
  new_date += tokens[3]
  new_date += '-'
  new_date += month_to_number(tokens[2])
  new_date += '-'
  new_date += tokens[1]
  new_date += 'T'
  new_date += tokens[4]
  new_date += 'Z'
  return new_date


for e in data:
  event = {}
  
  if e['userID'] is not None:
    event['_id'] = e['_id']
    event['sessionID'] = e['sessionID']
    event['connectionTime'] = convert_date(e['connectionTime'])
    event['disconnectionTime'] = convert_date(e['disconnectTime'])
    event['kWhDelivered'] = e['kWhDelivered']
    event['pointID'] = random.choice(pointIDs)
    event['paymentMethod'] = random.choice(['card', 'cash'])
    event['vehicleID'] = random.choice(vehicleIDs)
  
    string = json.dumps(event)
    events_out.write(string + "\n")
  
events_in.close()
events_out.close()
