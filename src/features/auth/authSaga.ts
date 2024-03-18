import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { t } from 'i18next';

import { toast } from 'react-toastify';
import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { authApi } from './api';
import { authActions, selectRoles, setRoles, setUser } from './authSlice';
import { LoginPayload, LoginSuccessAction, Roles, User, UserInfo } from './models';
import { ResponseAPi, ResponseMessage } from 'model/common';
import { useAppSelector } from 'app/hooks';
import { user_api, user_api_role } from 'utils/apiLink';
import { clearCacheFunction1 } from 'utils/helper';

function* handleLogin(payload: LoginPayload) {
  try {
    const rs: any = yield call(authApi.login, payload);
    if (payload.rememberMe) {
      yield localStorage.setItem('access_token', rs.data.accessToken);
    } else {
      yield sessionStorage.setItem('access_token', rs.data.accessToken);
    }
    yield put(authActions.loginSuccess(rs));

    //xóa cache khi đăng nhập thảnh công
    yield call(clearCacheFunction1);

    // Call the API with the updated URL
    const updatedUrl = `${user_api_role}/users/${rs.data.userId}/roles`;
    const updatedUser = `${user_api_role}/users/${rs.data.userId}`;
    const headers = new Headers({ Authorization: `Bearer ${rs.data.accessToken}` });
    const response = yield call(fetch, updatedUrl, { headers });
    const responseUser = yield call(fetch, updatedUser, { headers });
    const data = yield response.json();
    const dataUser = yield responseUser.json();
    // Cập nhật dữ liệu roles trong store
    yield put(setRoles(data));
    yield put(setUser(dataUser));
    // Lưu trữ giá trị roles vào localStorage
    yield localStorage.setItem('roles', JSON.stringify(data));
    yield localStorage.setItem('user', JSON.stringify(dataUser));

    // const name = roles?.data.pagingData;
    yield put(push('/vacine-record'));
    //    if (name?.find((e) => e.name === 'Records Management')) {
    //     yield put(push('/vacine-record'));
    // }
  } catch (error: any) {
    console.log(error);
    toast.error('Sai tài khoản hoặc mật khẩu');
    yield put(authActions.logout());
    yield put(authActions.loginFailed(t(error?.response?.data) || error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  localStorage.removeItem('roles');
  localStorage.removeItem('user');
  // redirect to login page
  // yield put(push('/login'));
  const rolesInLocalStorage = JSON.parse(localStorage.getItem('roles') || '[]');
  if (rolesInLocalStorage.length === 0) {
    yield put(push('/login'));
  } else {
    // Redirect to another page if roles are not empty
    yield put(push('/another-page')); // Change '/another-page' to the desired page
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn =
      Boolean(localStorage.getItem('access_token')) ||
      Boolean(sessionStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* handleGetUserInfo() {
  try {
    const rs: ResponseMessage<UserInfo> = yield call(authApi.getUserInfo);
    yield put(authActions.getUserInfoSuccess(rs.data));
  } catch (error) {}
}

function* handleGetUserInfoNew(action: PayloadAction<string>) {
  try {
    const rs: ResponseMessage<User> = yield call(authApi.getUserInfoNew, action.payload);
    yield put(authActions.getUserInfoNewSuccess(rs.data));
  } catch (error) {}
}

function* initApp() {
  // Khôi phục giá trị roles từ localStorage
  const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');

  // Cập nhật giá trị roles trong store
  yield put(setRoles(roles));
}
function* initAppUser() {
  // Khôi phục giá trị roles từ localStorage
  const user = JSON.parse(localStorage.getItem('user') ?? '[]');

  // Cập nhật giá trị roles trong store
  yield put(setUser(user));
}
export function* authSaga() {
  yield fork(watchLoginFlow);
  yield takeLatest(authActions.getUserInfo, handleGetUserInfo);
  // yield takeLatest(authActions.getUserInfoNew, handleGetUserInfoNew);
  yield takeLatest('INIT_APP', initApp);
  yield takeLatest('INIT_APP_USER', initAppUser);
}
