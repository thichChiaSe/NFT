const base_url = `https://vaccinationcfr.hcdc.vn:8081/api`;
// const base_url = `https://tcxc-api.hcdc.vn:8082/api`;
// const user_api = `https://user-management.bakco.vn/api`;
// const vaccin_url_new = `https://tcxc-api.hcdc.vn:8082/api`;
// export const user_api = `https://authmanagement.hcdc.vn:8082/api/auth`;
// const user_api_new = `https://authmanagement.hcdc.vn:8082/api`;

export const user_api = `https://authmanagement.hcdc.vn:8082/api/auth`;
const user_api_new = `https://authmanagement.hcdc.vn:8082/api`;

const vaccin_url_new = `https://vaccinationcfr.hcdc.vn:8081/api`;
const vaccin_url_new_dev = `https://tcxc-api.hcdc.vn:8082/api`;

export const user_api_role = `https://authmanagement.hcdc.vn:8082/api`;
const roles_url = `https://authmanagement.hcdc.vn:8082/api/roles`;
export const upload_file_url = `https://vaccinationcfr-service.hcdc.vn`;
//dev
export const dev = `https://vaccinationcfr.hcdc.vn:8081/api`;
export const editPayment = `https://vaccinationcfr.hcdc.vn:8081`;
//product
export const product = `https://tcxc-api.hcdc.vn/api`;
export const editPaymentProduct = `https://vaccinationcfr.hcdc.vn:8081`;

export const apiLinks = {
  auth: {
    login: `${user_api}/login`,
    getUserInfo: `${user_api}/Users/GetUserInfo`,
    getUserInfoNew: `${user_api_new}/users`,
    changePassword: `${user_api}/Users/ChangePassword`,
  },
  vaccineSheet: {
    getVaccineSheet: `${product}/VaccinationSheet?IsActive=true`,
    postVaccineSheet: `${product}/VaccinationSheet`,
    getDetailVaccineSheet: `${product}/VaccinationSheet`,
    upDateVaccineSheet: `${product}/VaccinationSheet`,
    deleteVaccineSheet: `${product}/VaccinationSheet`,
    uploadFDF: 'http://202.78.227.81:30938/api/Files/UploadFile',
    importFile: `${product}/files/excel-file`,
    importFileLocal: `https://localhost:7052/api/files/excel-file`,
  },
  peopleInfor: {
    getPeople: `${product}/people`,
    getImmuzationRecord: `${product}/people`,
    getImmuzationRecordInVcSheet: `${product}/VaccinationSheet`,
  },
  immuizationRecord: {
    common: `${product}/immunization-records`,
    postIR: `${product}/immunization-records/archive-sheet`,
  },
  vaccineType: {
    getVaccineType: `${product}/vaccine-type`,
  },
  roles: {
    common: roles_url,
  },
  people: {
    people: `${product}/people`,
  },
  service: {
    get: `${product}/payment-service`,
    getByid: function (id: string) {
      return `${product}/payment-service/${id}`;
    },
    post: `${product}/payment-service`,
    put: `${product}/payment-service`,
    delete: function (id: string) {
      return `${product}/payment-service/${id}`;
    },
  },
  uploadFile: {
    common: `${upload_file_url}`,
    excelData: `${upload_file_url}/excel-data`,
  },
  exportIssue: {
    common: `${product}/people`,
  },
  rf: {
    common: `${product}/payment-vaccine`,
  },
  medic: {
    common: `${product}/medicines`,
  },
  ps: {
    common: `${product}/payment-service`,
  },
  tmp: {
    common: `${product}/tmp-customer`,
    excel: `${product}/tmp-customer/excel-file`,
  },
  customerSession: {
    base: `${product}/session-customer`,
    common: `${product}/session-customer/reception`,
  },
  reportStatistics: {
    common: `${product}/Reports/order-detail-report`,
    export: `${product}/Reports/export-order-detail-report`,
    revenueReport: `${product}/Reports/revenue-report`,
    revenueReportExport: `${product}/Reports/export-revenue-report`,
  },
  common: {
    common: `${editPaymentProduct}`,
  },
};
