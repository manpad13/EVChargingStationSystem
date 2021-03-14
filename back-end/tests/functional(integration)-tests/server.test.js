const app = require('../../app') //Link to the app file
const supertest = require('supertest')
const { response } = require('../../app')
const request = supertest(app)
const Users = require('../../models/UsersModel')
const Events = require('../../models/EventsModel')
var token_forTesting

// functional Tests for back end

describe('healthCheck endpoint', () =>{
    it('should return {"status": OK}', async done =>{
        const res = await request.get('/evcharge/api/admin/healthcheck')
        const responseJson = res.body
        expect(responseJson["status"]).toBe("OK")
        done()
    })
})

describe('resetSessions endpoint', () =>{
    it('should return {"status": OK}', async done =>{
        const res = await request.post('/evcharge/api/admin/resetsessions')
        const responseJson = res.body
        expect(responseJson["status"]).toBe("OK")
        done()
    })
    
    it('should return only one user(the admin)', async done =>{
        const res = await request.get('/evcharge/api/admin/resetsessions')
        const users = await Users.find({})
        expect(users.length).toBe(1)
        expect(users[0].username).toBe("admin")
        done()
    })
    it('should return no sessions', async done =>{
        const res = await request.get('/evcharge/api/admin/resetsessions')
        const users = await Events.find({})
        expect(users.length).toBe(0)
        done()
    })
})

describe('login endpoint', () =>{
    it('should return should return a token for a valid user', async done =>{
        const res = await request.post('/evcharge/api/login').send({
            username : 'admin',
            password : 'petrol4ever'
        })
        const responseJson = res.body
        token_forTesting = responseJson['token']
        expect(responseJson).toHaveProperty('token')
        done()
    })
    it('should have Bad request as status if user doesnt exist', async done =>{
        const res = await request.post('/evcharge/api/login').send({
            username : 'adminaras',
            password : 'petrol4ever'
        })
        expect(res.status).toBe(400)
        done()
    })
})


