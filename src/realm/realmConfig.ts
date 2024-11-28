import Realm from 'realm';
import { UserSchema } from './schemas/userSchema';

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
    if (!realmInstance) {
        realmInstance = await Realm.open({
            path: 'myapp.realm',
            schema: [UserSchema],
        });
    }
    return realmInstance;
};

export const closeRealm = () => {
    if (realmInstance) {
        realmInstance.close();
        realmInstance = null;
    }
};
