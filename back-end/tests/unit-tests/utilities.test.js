const utilities = require('../../controllers/utilities')
const jwt = require('jsonwebtoken')

// test the authentication function
describe('generateAuthKey', () =>{
    it('should return a valid token', () =>{
        const username = "tasos" 
        const token = utilities.generateAuthKey(username, "random secret")
        const decoded = jwt.verify(token, "random secret")
        expect( decoded.username ).toEqual(username)
    })
})

// test the date_format function
describe('date_format', () =>{
    it('returns UTC date which should contain the year in the first 4 digits, given a yyyymmdd string date', () =>{
        const date = "20121230"
        const result = utilities.date_format(date)
        expect(result[0]).toBe("2")
        expect(result[1]).toBe("0")
        expect(result[2]).toBe("1")
        expect(result[3]).toBe("2")
    })
    it('returns UTC date which should contain the month in the 6th and 7th digit, given a yyyymmdd string date', () =>{
        const date = "20121230"
        const result = utilities.date_format(date)
        expect(result[4]).toBe("-")
        expect(result[5]).toBe("1")
        expect(result[6]).toBe("2")
    })
    it('returns UTC date which should contain the day in the 8th and 9th digit, given a yyyymmdd string date', () =>{
        const date = "20121230"
        const result = utilities.date_format(date)
        expect(result[7]).toBe("-")
        expect(result[8]).toBe("3")
        expect(result[9]).toBe("0")
    })
})

describe('findUser_byCredentials', () =>{
    it('should return a User, with his username, given his Credentials', () => {
        const result = utilities.findUser_byCredentials("admin", "petrol4ever")
        expect(result).resolves.toHaveProperty('username' , "admin");
      })

    it('should return a User, with his password, given his Credentials', () => {
        const result = utilities.findUser_byCredentials("admin", "petrol4ever")
        expect(result).resolves.toHaveProperty('password' , "admin");
      })
})

describe('setUserConnectionTo', () =>{
    it('should return a valid user.username field, given a user.username and a connection', () =>{
        const result = utilities.setUserConnectionTo("admin", "no")
        expect(result).resolves.toHaveProperty('username', "admin")
    })
    it('should return "yes" to the user.isConnected field, given a user.username and a connection= "yes"', () =>{
        const result = utilities.setUserConnectionTo("admin", "no")
        expect(result).resolves.toHaveProperty('isConnected', "no")
    })
    it('should return "no" to the user.isConnected field, given a user.username and a connection= "no"', () =>{
        const result = utilities.setUserConnectionTo("admin", "yes")
        expect(result).resolves.toHaveProperty('isConnected', "yes")
    })
})