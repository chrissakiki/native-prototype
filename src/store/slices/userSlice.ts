import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { closeRealm, getRealm } from '../../realm/realmConfig';
import axios from 'axios';
import { POST } from '../../api';
// import { getRealm } from '../../realm/schemas/userSchema';

type User = {
    username: string;
    branch: string;
    token: string;
}

export const loadUserFromRealm = createAsyncThunk<User | null, void>('user/loadFromRealm', async () => {
    const realm = await getRealm();

    const user = realm.objects('User')[0];

    // closeRealm();

    if (user) {
        return {
            username: user.username,
            branch: user.branch,
            token: user.token,
        } as User;
    }

    return null;
});




export const handleLogin = createAsyncThunk<
    { username: string; branch: string; token: string },  // Return Type
    { username: string; password: string },  // Argument 
    { rejectValue: string }  // Reject
>(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        console.log('here')
        const response = await POST<User>({ endpoint: '/login', formData: credentials, requiresAuth: false });

        console.log('response', response)

        if (response?.status === 200 && response?.data) {
            const realm = await getRealm();
            realm.write(() => {
                realm.create('User', { username: credentials.username, branch: 'Kaslik', token: response.data?.token });
            });

            return {
                username: credentials.username,
                branch: 'Kaslik',
                token: response.data?.token,
            };
        }

        return rejectWithValue('Invalid username or password!');
    }
);


export const handleLogout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
    const realm = await getRealm();

    realm.write(() => {
        const user = realm.objects('User')[0];
        if (user) {
            realm.delete(user);
        }
    })

    dispatch(logout());
    closeRealm();
});


interface IUser {
    username: string;
    branch: string;
    token: string | null;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    isLoggedIn: boolean;
    error: string | null;
}

const initialState: IUser = {
    username: '',
    branch: '',
    token: null,
    status: 'idle',
    isLoggedIn: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.username = '';
            state.branch = '';
            state.token = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromRealm.fulfilled, (state, action: PayloadAction<User | null>) => {
                if (action.payload) {
                    state.username = action.payload.username;
                    state.branch = action.payload.branch;
                    state.token = action.payload.token;
                    state.status = 'fulfilled';
                    state.isLoggedIn = true;
                } else {
                    state.status = 'rejected';
                    state.username = '';
                    state.branch = '';
                    state.token = null;
                    state.isLoggedIn = false;

                }
            })
            .addCase(handleLogin.pending, (state) => {
                state.status = 'pending';
                state.error = null;
                state.isLoggedIn = false
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.branch = action.payload.branch;
                state.token = action.payload.token;
                state.status = 'fulfilled';
                state.isLoggedIn = true;
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'Login failed';
                state.isLoggedIn = false
            });

    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
