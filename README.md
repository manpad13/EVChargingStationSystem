Όνοματεπώνυμο  | Αριθμός μητρώου
------------ | -------------
Ευάγγελος Παπαγιανόπουλος | 03115206
Αναστάσιος Διαμάντης | 03115032
Εμμανουήλ Παδουβάς | 03115076
Αλέξανδρος Κοντογιάννης | 03115048

Repository used for NTUA/ECE Software Engineering, 2020-2021.

Το αρχείο αυτό περιέχει οδηγίες για το στήσιμο της εφαρμογής που φτιάξαμε.

Η εγρασία γράφτηκε στο γλώσσα javascript ( back-end & cli & front-end ) με την χρήση του nodejs .

## Στήσιμο της βάσης δεδομένων

Τα αρχεία json είναι αποθηκευμένα στο παρακάτω φάκελο :

https://github.com/evangelospap/SoftEng-88-ev/tree/master/back-end/SoftEngDataset_and_scripts


Ένω είμαστε στο directory με τα αρχεία και η βάση δεδομένων είναι ανοιχτή, τρέχουμε :
```
cd from local path -->> path-to-back-end/back-end

και εκτελούμε:

mongoimport --db EVdb --collection points --file ./SoftEngDataset_and_scripts/points.json
mongoimport --db EVdb --collection vehicles --file ./SoftEngDataset_and_scripts/vehicles.json
mongoimport --db EVdb --collection events --file ./SoftEngDataset_and_scripts/events.json

Μετά εκτελούμε npm install για ενα εγκατασταθούν όλα τα node_modules που έχουν δηλωθεί στο package.json
```
Η βάση δεδομένων υλοποιήθηκε με **mongo db**


## Στήσιμο του back-end
Ενώ είμαστε στο directory του back-end σε ένα command-line γράφουμε :
```
npm install
```
(για τα dependencies απο modules)
```
npm run start 
```
( για την εκκίνηση του server)

## Στήσιμο του front-end
Ενώ είμαστε στο directory του front-end σε ένα command-line γράφουμε :
```
npm install
```
(για τα dependencies απο modules)
```
npm run start 
```
( για την εκκίνηση της react)



## Στήσιμο του CLI 
Ενώ είμαστε στο directory του cli σε ένα command-line γράφουμε :
```
npm install
```
(για τα dependencies απο modules)
```
npm link
```
( για να χρησιμοποιείται globally η εφαρμογή ev_group88, type ev_group88 -h for help info)

> Το **Testing** γίνεται για το cli είτε το back-end με την εντολή **npm test** στο αντίστοιχο directory

 **Χρήση:** 
 Απο οποιοδήποτε directory σε τερματικό μπορούμε πλέον να χρησιμοποιήσουμε την εφαρμογή **ev_group88**
 
