import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LoginPayload, Roles, User } from './models';
import { UserInfo } from './models';

export interface AuthState {
  isLoading: Boolean;
  currentUser?: UserInfo;
  avatar?: any;
  error?: string;
  roles?: Roles;
  user?: User;
}

const initialState: AuthState = {
  isLoading: false,
  currentUser: undefined,
  error: undefined,
  roles: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoading = true;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },

    getUserInfo(state) {
      state.isLoading = true;
    },
    getUserInfoSuccess(state, action: PayloadAction<UserInfo>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    getUserInfoFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    // getRoles(state) {
    //   state.isLoading = true;
    // },
    // getRolesSuccess(state, action: PayloadAction<Roles>) {
    //   state.roles = action.payload;
    //   state.isLoading = false;
    // },
    // getRolesFailed(state, action: PayloadAction<any>) {
    //   state.isLoading = false;
    // },
    getUserInfoNew(state) {
      state.isLoading = true;
    },
    getUserInfoNewSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserInfoNewFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Lưu trữ giá trị user vào localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
      // Lưu trữ giá trị roles vào localStorage
      localStorage.setItem('roles', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoading = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectRoles = (state: RootState) => state.auth.roles;
export const selectUser = (state: RootState) => state.auth.user;
export const { setRoles } = authSlice.actions;
export const { setUser } = authSlice.actions;


const authReducer = authSlice.reducer;
export default authReducer;
