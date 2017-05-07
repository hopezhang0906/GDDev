module.exports = {
    ProjectSchema: {
        name: 'Project',
        properties: {
            id: 'string',
            uploadedOn: { type: 'date', indexed: true },
            lastModifiedOn: { type: 'date', indexed: true },

            type: { type: 'string', indexed: true },
            //faculty: { type: 'string'},
            title: { type: 'string', indexed: true },
            thumbnail: 'string',
            tags: { type: 'list', objectType: 'Tag' },

            description: 'string',
            finishedOn: { type: 'date', indexed: true },
            info: { type: 'list', objectType: 'Info' },

            uploader: 'User',
            makers: { type: 'list', objectType: 'Maker' }
        }
    },

    TagSchema: {
        name: 'Tag',
        properties: {
            name: { type: 'string', indexed: true },
            description: { type: 'string', optional: true }
        }
    },

    MakerSchema: {
        name: 'Maker',
        properties: {
            userId: { type: 'string', optional: true },
            name: 'string',
            role: 'string'
        }
    },

    InfoSchema: {
        name: 'Info',
        properties: {
            title: 'string',
            content: 'string'
        }
    },

    UserSchema: {
        name: 'User',
        properties: {
            id: 'string',
            signupOn: 'date',

            email: 'string',
            password: 'string',

            avatar: 'string',
            name: 'string',
            bio: 'string',

            favorites: { type: 'list', objectType: 'Project' }
        }
    }
}