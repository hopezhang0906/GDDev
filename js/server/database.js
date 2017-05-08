var Realm = require('realm')
var schemas = require('./schemas')

class Project extends Realm.Object {}
Project.schema = schemas.ProjectSchema

class Info extends Realm.Object {}
Project.schema = schemas.InfoSchema

class Tag extends Realm.Object {}
Project.schema = schemas.TagSchema

class Maker extends Realm.Object {}
Project.schema = schemas.MakerSchema

class User extends Realm.Object {}
Project.schema = schemas.UserSchema

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

    project: {
        query: (sort, filter) => {
            var query = realm.objects('Project')
            var result = query
            if (filter == null && sort == null) return query
            if (filter != null) result = result.filtered(filter)
            if (sort != null) result = result.sorted(sort)
            return result.length == 0 ? null : result[0]
        },

        add: (object) => {
            console.log(object)
            realm.write(() => {
                let project = realm.create('Project', object)
            })
        },

        update: (object) => {
            realm.write(() => {
                realm.create('Project', object, true)
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