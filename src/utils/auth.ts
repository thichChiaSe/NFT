import jwtDecode from 'jwt-decode';

export const authUtils = {
  checkPermission: (access_token: string | null, permissionCode: string) => {
    if (access_token) {
      const decoded = jwtDecode<any>(access_token);
      if (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'ADMIN') {
        return true;
      }
    }
    return false;
  },
};
