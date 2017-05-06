const ProjectSchema = {
    name: "Project",
    properties: {
        id: 'string',
        uploadedOn: 'date',
        lastModifiedOn: 'date',

        type: 'string',
        title: 'string',
        thumbnail: 'string',
        tags: { type: 'list', objectType: 'string' },

        description: 'string',
        finishedOn: 'date',
        info: { type: 'list', objectType: 'Info' },

        uploader: { type: 'User' },
        makers: { type: 'list', objectType: 'Maker' }
    }
}

const MakerSchema = {
    name: 'Maker',
    properties: {
        id: { type: 'string', optional: true },
        name: 'string',
        role: 'string'
    }
}

const InfoSchema = {
    name: 'Info',
    properties: {
        title: 'string',
        content: 'string'
    }
}

const UserSchema = {
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