#!/usr/bin/env node

/*
!!always npm link if you import this project!!

Scopes:
    healthcheck /..
    resetsessions /..
    login --username --passw /..
    logout /..
    SessionsPerPoint --point --datefrom --dateto /..
    SessionsPerStation --station --.. --.. /..
    SessionsPerEV --ev --.. -..
    SessionsPerProvider --provider ..
    Admin
    .
    .
    .
    example: 
    ev_group88 SessionsPerEv --vehicle EV_ID --from 20200101 --to 20201201 --format json --apikey PASS
*/


const program = require('commander')
const healthcheck_handling = require('../lib/healthcheck_handler')
const resetsessions_handling = require('../lib/resetsessions_handler')
const login_handling = require('../lib/login_handler')
const logout_handling = require('../lib/logout_handler')
const sessionsPerPoint_handling = require('../lib/sessionsPerPoint_handler')
const sessionsPerStation_handling = require('../lib/sessionsPerStation_handler')
const sessionsPerEV_handling = require('../lib/sessionsPerEV_handler')
const sessionsPerProvider_handling = require('../lib/sessionsPerProvider_handler')
const usermod_handling = require('../lib/admin/usermod_handler')
const users_handling = require('../lib/admin/users_handler')
const sessionsupd_handling = require('../lib/admin/sessionsupd_handler')
var executed = false

function set_ex(){
    executed = true
}

program 
    .command('healthcheck')
    .description('Usage: healthcheck')
    .action(() => {
        set_ex()
        healthcheck_handling()
    })

program
    .command('resetsessions')
    .description('Usage: resetsessions')
    .action(a => {
        set_ex()
        resetsessions_handling()
    })

program
    .command('login')
    .description('Usage: login --username <username> --passw <passw>')
    .option('--username <username> "Field for username" ')
    .option('--passw <passw> "Field for password" ')
    .action(options => {
      set_ex()
      login_handling(options, program)
    })

program
    .command('logout')
    .description('Usage: logout')
    .action(options => {
      set_ex()
      logout_handling(options, program)
    })

program
    .command('SessionsPerPoint')
    .description('Usage: SessionsPerPoint --point <pointID> --datefrom <yyyymmdd_from> --dateto <yyyymmdd_to>')
    .option('--point <point> "Field for point" ')
    .option('--datefrom <datefrom> "Field for datefrom" ')
    .option('--dateto <dateto> "Field for dateto" ')
    .action(options => {
        set_ex()
        sessionsPerPoint_handling(options, program)
})
program
    .command('SessionsPerStation')
    .description('Usage: SessionsPerStation --station <station> --datefrom <yyyymmdd_from> --dateto <yyyymmdd_to>')
    .option('--station <station> "Field for station" ')
    .option('--datefrom <datefrom> "Field for datefrom" ')
    .option('--dateto <dateto> "Field for dateto" ')
    .action(options => {
        set_ex()
        sessionsPerStation_handling(options, program)
})
program
    .command('SessionsPerEV')
    .description('Usage: SessionsPerEV --ev <ev> --datefrom <yyyymmdd_from> --dateto <yyyymmdd_to>')
    .option('--ev <ev> "Field for EV" ')
    .option('--datefrom <datefrom> "Field for datefrom" ')
    .option('--dateto <dateto> "Field for dateto" ')
    .action(options => {
        set_ex()
        sessionsPerEV_handling(options, program)
})

program
    .command('SessionsPerProvider')
    .description('Usage: SessionsPerProvider --provider <provider> --datefrom <yyyymmdd_from> --dateto <yyyymmdd_to>')
    .option('--provider <provider> "Field for provider" ')
    .option('--datefrom <datefrom> "Field for datefrom" ')
    .option('--dateto <dateto> "Field for dateto" ')
    .action(options => {
        set_ex()
        sessionsPerProvider_handling(options, program)
})



    program
    .command('Admin')
    .option('--usermod')
    .option('--username <user>')
    .option('--passw <passw>')

    .option('--users')
    
    .option('--username <user>')

    .option('--sessionsupd')
    .option('--source <source>')

    .option('--healthcheck')

    .option('--resetsessions')
    .action(options =>{
        if(options.usermod){
            set_ex()
            usermod_handling(options,program)
        }
        if(options.users){
            set_ex()
            users_handling(options,program)
        }
        if(options.sessionsupd){
            set_ex()            
            sessionsupd_handling(options, program)
        }
        if(options.healthcheck){
            set_ex()
            healthcheck_handling()
        }
        if(options.resetsessions){
            set_ex()
            resetsessions_handling()
        }     
        
    })

        


program.parse(process.argv)
if (!executed) {
    program.help();
}