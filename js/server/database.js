var Realm = require('realm')
var schemas = require('./schemas')

var DB = {
    realm: null,
    init: () => {
        realm = new Realm({
            schema: [
                schemas.InfoSchema,
                schemas.MakerSchema,
                schemas.ProjectSchema,
                schemas.TagSchema,
                schemas.UserSchema
            ]
        })
    },

    get: {
        byId: (type, id) => {
            let query = realm.objects(type)
            return result = query.filtered(`id = "${id}"`)
        }
    },

    user: {

    },

    edit: {
        add: (object) => {
            realm.write(() => {
                realm.create(schemas.UserSchema.name, object)
            })
        },

        update: (object) => {
            realm.write(() => {
                realm.create(schemas.UserSchema.name, object, true)
            })
        },

        delete: (object) => {
            realm.write(() => {
                realm.delete(object)
            })
        }
    }
}

module.exports = DB;