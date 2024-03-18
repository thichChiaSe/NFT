import { ChangePasswordPayload } from 'features/auth/components/ChangePasswordForm';

import axiosClient from '../../../api/axiosClient';
import { LoginPayload, LoginSuccessAction, User } from '../models';
import { apiLinks } from 'utils/apiLink';

export const authApi = {
  login(payload: LoginPayload): Promise<User> {
    return axiosClient.post(apiLinks.auth.login, payload);
  },
  getUserInfo(): Promise<User> {
    return axiosClient.get(apiLinks.auth.getUserInfo);
  },
  getUserInfoNew(userId: string): Promise<User> {
    return axiosClient.get(`${apiLinks.auth.getUserInfoNew}/${userId}`);
  },
  changePassword(payload: ChangePasswordPayload): Promise<any> {
    return axiosClient.put(apiLinks.auth.changePassword, payload);
  },
  getRole(payload: LoginSuccessAction): Promise<LoginSuccessAction> {
    return axiosClient.get(`${apiLinks.roles.common}/3715e95c-c7a3-47df-015c-08dba3a36056`);
  },
};
