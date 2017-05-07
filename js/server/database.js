var Realm = require('realm')
var Schemas = require('./schemas')

var DB = {
    realm: null,
    init: () => {
        realm = new Realm({
            schema: [
                Schemas.InfoSchema,
                Schemas.MakerSchema,
                Schemas.ProjectSchema,
                Schemas.TagSchema,
                Schemas.UserSchema
            ]
        })
    },

    write: (operations) => {
        realm.write(operations)
    },

    get: {
        byId: (type, id) => {
            let query = realm.objects(type)
            return query.filtered(`id = "${id}"`)
        }
    },

    user: {

    },

    project: {
        add: (project, info, tags, makers) => {
            realm.write(() => {
                let p = realm.create(Schemas.ProjectSchema.name, project)
                p.info = info
                p.tags = tags
                p.makrs = makers
            })
        },

        update: (object) => {
            realm.write(() => {
                realm.create(Schemas.ProjectSchema.name, object, true)
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