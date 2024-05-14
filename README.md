Full Name	  | Github UserName
------------ | -------------
Evangelos Papagianopoulos	 | evangelospap
Anastasios Diamantis | jugeekuz
Emmanouil Padouvas | manpad13
Alexandros Kontogiannis| 	alex2449

Repository used for NTUA/ECE Software Engineering, 2020-2021.


## EV Charging Station Management System
This is an application which serves the use of being a management system to a network of EV charging stations.
Client-side users of this application can register/log-in (provided they have an EV) and use the application to
find the closest charging station in which to charge their EV (as well as many other features).
Admin-side users of this application can control various aspects of the application through a UI.

The application features:

* Back-End written in NodeJS
* Front-End written in NodeJS & CSS
* CLI using npm-commander
* Unit testing using Chai

## Setting up the database
The json files are stored in the following folder:

master/back-end/SoftEngDataset_and_scripts

While we are in the directory with the files and the database is running we execute the following :

```
cd from local path -->> path-to-back-end/back-end

and then run:

mongoimport --db EVdb --collection points --file ./SoftEngDataset_and_scripts/points.json
mongoimport --db EVdb --collection vehicles --file ./SoftEngDataset_and_scripts/vehicles.json
mongoimport --db EVdb --collection events --file ./SoftEngDataset_and_scripts/events.json

Then we execute npm install so that all the node_modules declared in package.json are installed.
```
The database was made using **mongo db**


## Setting up the back-end
While we are in the back-end directory inside a command-line we execute :
```
npm install
```
(for all the dependencies from modules)
```
npm run start 
```
(for starting the server)

## Setting up the front-end
While we are in the front-end directory inside a command-line we execute :
```
npm install
```
(for all the dependencies from modules)
```
npm run start 
```
(for starting react)


## Setting up the CLI
While we are in the cli's directory inside a command-line we execute:
```
npm install
```
(for all the dependencies from modules)
```
npm link
```
(so that the application ev_group88 can be globally used)

> Testing is done for the cli as well as the back-end using npm test in the equivalent directory

 Usage: From within any directory in a terminal we can now use the application energy_group88
