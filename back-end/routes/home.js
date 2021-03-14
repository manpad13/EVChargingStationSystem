const express = require('express')
const { userAuthorization } = require('../controllers/middlewares/authorization')
const router = express.Router()
const Points = require('../models/PointsModel')


router.get('/', (req,res) => {
    console.log('Home Page')
    res.send('We are on home')
})

router.post('/closest',  async(req,res) =>{
    let X = parseFloat(req.body.longitude)
    let Y = parseFloat(req.body.latitude)
    let points = await Points.find({});
    smallestDistance = 1000000000000
    var i
    var closest = -1
    for (i=0; i< points.length; i++){
        let x = points[i].location['geo']['coordinates'][0]
        let y = points[i].location['geo']['coordinates'][1]
        // calculate euclean distance
        distance = Math.sqrt( Math.pow(X-x , 2) + Math.pow(Y-y, 2) )
        if (distance < smallestDistance) {
            smallestDistance = distance
            closest = i
        }
    }
    res.json({"smallestDistance": smallestDistance, "closestPoint": points[closest]})
    return
})

module.exports = router