var User = require('../../models/UsersModel')
var Event = require('../../models/EventsModel')


async function resetSessions(req, res, next){
    let adminInfo = {
        username : "admin",
        password : "petrol4ever",
        isAdmin : true,
        isConnected : "no"
    }
    // diagrafh olwn twn gegonotwn fortishs gia olous tous users
    // arxikopoihsh tou default user ws admin me adminInfo stoixeia
    await Event.deleteMany({}).then(function(){
        console.log("Data deleted")
    }).catch(function(error){
        console.log(error)
    })
    
    await User.deleteMany({})
    const defaultUser = new User(adminInfo)  
    await defaultUser.save()

    res.json({status: "OK"})
}

module.exports = function(app){
    app.route('/evcharge/api/admin/resetsessions')
    .post(resetSessions)
}

