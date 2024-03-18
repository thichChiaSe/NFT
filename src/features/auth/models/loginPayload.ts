export interface LoginPayload {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginSuccessAction {
  type: string;
  payload: {
    access_token: string;
    userId: string;
  };
}

interface pagingData {
  name: string;
  description: string;
}

interface data {
  pagingData: pagingData[];
}
interface Role {
  id: string;
  data: data;
}
export type Roles = Role;
