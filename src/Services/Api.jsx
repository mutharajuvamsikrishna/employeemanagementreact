import axios from "axios";

const API_BASE_URL = "http://localhost:8086";

const Api = axios.create({
  baseURL: API_BASE_URL,
});
const getJwtToken = () => {
  return localStorage.getItem("jwtToken");
  // Replace 'yourJwtTokenKey' with the actual key you used for storing the JWT token
};
const getApiHeaders = () => {
  const jwtToken = getJwtToken();
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

export const getProfiles = (empId) => {
  const headers = getApiHeaders(); // Dynamically get headers when making the request
  return Api.get(`/register/v1/getreg?empId=${empId}`, headers);
};

export const UserRegister = (data) => {
  return Api.post("/register/v1/sendotp", data);
};
export const UserRegisterByAdmin = (data) => {
  const headers = getApiHeaders();
  return Api.post("/register/v1/addemployee", data,headers);
};
export const getAllReisters = () => {
  return Api.get("/register/v1/getallreg");
};
export const postUserOtp = (data) => {
  return Api.post("/register/v1/verifyOtp", data);
};
export const postUserLogin = (data) => {
  return Api.post("/login/v1/authenticate", data);
};
export const postUserForgetPassword = (data) => {
  return Api.post("/forgetaccount/v1/forgetaccount", data);
};
export const postChangeUserPasswordByEmail = (data) => {
  return Api.put("/forgetaccount/v1/verifyforgetotp", data);
};
export const postPersonalDetails = (data1) => {
  const headers = getApiHeaders();
  return Api.post("/personaldetails/v1/personaldetailssave", data1, headers);
};
export const getPersonalDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/personaldetails/v1/useruniquereq?empId=${empId}`, headers);
};
export const putPersonalDetails = (data1) => {
  const headers = getApiHeaders();
  return Api.put("/personaldetails/v1/personalupdateDetails", data1, headers);
};
export const postEmployeeDetails = (data) => {
  const headers = getApiHeaders();
  return Api.post("/employeedetails/v1/employeedetails-save", data, headers);
};
export const getEmployeeDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(
    `/employeedetails/v1/getemployeedetails?empId=${empId}`,
    headers
  );
};
export const updateEmployeeDetails = (data) => {
  const headers = getApiHeaders();
  return Api.put("/employeedetails/v1/employeedetails-update", data, headers);
};
export const postFamilyDetails = (data) => {
  const headers = getApiHeaders();
  return Api.post("/familydetails/v1/familydetails-save", data, headers);
};
export const getFamilyDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/familydetails/v1/getfamilydetails?empId=${empId}`, headers);
};
export const putFamilyDetails = (data) => {
  const headers = getApiHeaders();
  return Api.put("/familydetails/v1/familydetails-update", data, headers);
};
export const postBankDetails = (data) => {
  const headers = getApiHeaders();
  return Api.post("/bankdetails/v1/bankdetails-save", data, headers);
};
export const getBankDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/bankdetails/v1/getbankdetails?empId=${empId}`, headers);
};
export const putBankDetails = (data) => {
  const headers = getApiHeaders();
  return Api.put("/bankdetails/v1/bankdetails-update", data, headers);
};
export const postEmergencyDetails = (data) => {
  const headers = getApiHeaders();
  return Api.post("/emergencydetails/v1/emergencydetails-save", data, headers);
};
export const getEmergencyDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(
    `/emergencydetails/v1/getemergencydetails?empId=${empId}`,
    headers
  );
};
export const updateEmergencyDetails = (data) => {
  const headers = getApiHeaders();
  return Api.put("/emergencydetails/v1/emergencydetails-update", data, headers);
};
export const postRaiseDisputeDetails = (data) => {
  const headers = getApiHeaders();
  return Api.post(
    "/raisedisputedetails/v1/raisedisputedetails-save",
    data,
    headers
  );
};
export const getRaiseDisputeDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(
    `/raisedisputedetails/v1/getraisedisputedetails?empId=${empId}`,
    headers
  );
};
export const putRaiseDisputeDetailsUpdate = (data) => {
  const headers = getApiHeaders();
  return Api.put(
    "/raisedisputedetails/v1/ticket-update",
    data,
    headers
  );
};
export const getAllAdminRegisterDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getadmindetails", headers);
};
export const getAllBankDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getbankdetails", headers);
};
export const getAllEmergencyDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getemergencydetails", headers);
};
export const getAllEmployeeDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getemployeedetails", headers);
};
export const getAllFamilyDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getfamilydetails", headers);
};
export const getAllPersonalDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/admin/v1/getpersonaldetails", headers);
};
export const searchAdminRegisterDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(`/admin/v1/searchadminregister?query=${searchQuery}`, headers);
};
export const searchBankDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(`/admin/v1/searchbankdetails?query=${searchQuery}`, headers);
};
export const searchEmergencyDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(
    `/admin/v1/searchemergencydetails?query=${searchQuery}`,
    headers
  );
};
export const searchEmployeeDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(
    `/admin/v1/searchemployeedetails?query=${searchQuery}`,
    headers
  );
};
export const searchFamilyDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(`/admin/v1/searchfamilydetails?query=${searchQuery}`, headers);
};
export const searchPersonalDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(
    `/admin/v1/searchpersonaldetails?query=${searchQuery}`,
    headers
  );
};
export const deleteAdminRegisterDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deleteadminregister?empId=${empId}`, headers);
};
export const deleteBankDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deletebankdetails?empId=${empId}`, headers);
};
export const deleteEmergencyDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deleteemergemcydetails?empId=${empId}`, headers);
};
export const deleteEmployeeDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deleteemployeedetails?empId=${empId}`, headers);
};
export const deleteFamilyDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deletefamilydetails?empId=${empId}`, headers);
};
export const deletePersonalDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/admin/v1/deletepersonaldetails?empId=${empId}`, headers);
};
export const postAvatarDetails = (formData) => {
  const headers = getApiHeaders();
  return Api.post("/profile/v1/avatar", formData, headers);
};
export const getAvatarDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/profile/v1/getavatardetails?empId=${empId}`, headers);
};
export const deleteAvatarDetails = (empId) => {
  const headers = getApiHeaders();
  return Api.delete(`/profile/v1/deletavatar?empId=${empId}`, headers);
};
export const searchTicketDetails = (searchQuery) => {
  const headers = getApiHeaders();
  return Api.get(
    `/raisedisputedetails/v1/searchtickets?query=${searchQuery}`,
    headers
  );
};
export const getAllTicketDetails = () => {
  const headers = getApiHeaders();
  return Api.get("/raisedisputedetails/v1/getalltickets", headers);
};
export const postUserCheckList = (data) => {
  const headers = getApiHeaders();
  return Api.post("/checklist/v1/userchecklist-save",data,headers);
};
export const getUserCheckList = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/checklist/v1/userchecklist-get?empId=${empId}`,headers);
};
export const postAdminCheckList = (data) => {
  const headers = getApiHeaders();
  return Api.post("/checklist/v1/adminchecklist-save", data,headers);
};
export const updateAdminCheckList = (data) => {
  const headers = getApiHeaders();
  return Api.put("/checklist/v1/adminchecklist-update", data,headers);
};
export const getAdminCheckList = (empId) => {
  const headers = getApiHeaders();
  return Api.get(`/checklist/v1/adminchecklist-get?empId=${empId}`, headers);
};
export const getAllAdminCheckList = () => {
  const headers = getApiHeaders();
  return Api.get("/checklist/v1/adminchecklist-getall", headers);
};
