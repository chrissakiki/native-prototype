import Realm from 'realm';

export const UserSchema = {
    name: 'User',
    properties: {
        username: 'string?',
        branch: 'string?',
        token: 'string?',
    },
    primaryKey: 'username',
};

export const getRealm = async () => {
    return await Realm.open({
        path: 'myapp.realm',
        schema: [UserSchema],
    });
};
