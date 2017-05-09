'use strict'

var Realm = require('realm')
var schemas = require('./schemas')
var randomstring = require('randomstring')
var md5 = require('md5')
var realm

var DB = {
    init: () => {
        realm = new Realm({
            schema: [
                schemas.InfoSchema,
                schemas.MakerSchema,
                schemas.ProjectSchema,
                schemas.TagSchema,
                schemas.UserSchema,
                schemas.TokenSchema
            ]
        })
    },

    portal: {
        signup: (object, cb) => {
            realm.write(()=>{
                realm.create('User', object)
            })
        },

        auth: (cred, cb) => {
            let users = realm.objects('User')
            let user = users.filtered(`email == "${cred.email}" AND password == "${cred.password}"`)[0]
            if (user.length != 0) {
                let date = new Date()
                date.setDate(date.getDate() + 20)
                realm.write(() => {
                    let token = realm.create('Token', {
                        userId: `${user.id}`,
                        token: md5(new Date().getMilliseconds) + randomstring.generate(30),
                        expireOn: date
                    })
                    cb(null, token)
                })
            } else cb(null, null)
        },

        validate: (t) => {
            let tokens = realm.objects('Token')
            let token = tokens.filtered(`token == "${t}"`)
            return token.length != 0
        },

        invalidate: (t) => {
            let tokens = realm.objects('Token')
            let token = tokens.filtered(`token == "${t}"`)
            DB.delete(token)
        },

        query: (sort, filter) => {
            var query = realm.objects('User')
            var result = query
            if (filter != null) result = result.filtered(filter)
            if (sort != null) result = result.sorted(sort)
            return result.length == 0 ? null : result
        }
    },

    project: {
        query: (sort, filter) => {
            var query = realm.objects('Project')
            var result = query
            if (filter != null) result = result.filtered(filter)
            if (sort != null) result = result.sorted(sort)
            return result.length == 0 ? null : result
        },

        add: (object) => {
            realm.write(() => {
                realm.create('Project', object)
            })
        },

        update: (object) => {
            realm.write(() => {
                realm.create('Project', object, true)
            })
        }
    },

    delete: (object) => {
        realm.write(() => {
            realm.delete(object)
        })
    }
}

module.exports = DB;