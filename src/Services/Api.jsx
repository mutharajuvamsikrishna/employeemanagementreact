import axios from 'axios';

const API_BASE_URL = 'http://localhost:1279';

const Api = axios.create({
  baseURL: API_BASE_URL,
});
const getJwtToken = () => {
  return localStorage.getItem('jwtToken')
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

export const getProfiles = (email) => {
  const headers = getApiHeaders(); // Dynamically get headers when making the request
  return Api.get(`/register/v1/getreg?email=${email}`, headers);
};


export const UserRegister = (data) => {
  
    return Api.post("/register/v1/sendotp",data)
  }
  export const getAllReisters=()=>{
    return Api.get("/register/v1/getallreg")
  }
  export const postUserOtp = (data) => {
  
    return Api.post("/register/v1/verifyOtp",data)
  }
  export const postUserLogin = (data) => {
  
    return Api.post("/login/v1/authenticate",data)
  }
  export const postUserForgetPassword=(data)=>{
    return Api.post("/forgetaccount/v1/forgetaccount",data)
  }
  export const postChangeUserPasswordByEmail=(data)=>{
    return Api.put("/forgetaccount/v1/verifyforgetotp",data)
  }
  export const postPersonalDetails = (data1) => {
    const headers = getApiHeaders();
    return Api.post("/personaldetails/v1/personaldetailssave",data1,headers)
  }
  export const getPersonalDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/personaldetails/v1/useruniquereq?email=${email}`, headers)
  }
  export const putPersonalDetails = (data1) => {
    const headers = getApiHeaders();
    return Api.put("/personaldetails/v1/personalupdateDetails",data1,headers)
  }
  export const postEmployeeDetails = (data) => {
    const headers = getApiHeaders();
    return Api.post("/employeedetails/v1/employeedetails-save",data,headers)
  }
  export const getEmployeeDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/employeedetails/v1/getemployeedetails?email=${email}`, headers)
  }
  export const updateEmployeeDetails = (data) => {
    const headers = getApiHeaders();
    return Api.put("/employeedetails/v1/employeedetails-update",data,headers)
  }
  export const postFamilyDetails = (data) => {
    const headers = getApiHeaders();
    return Api.post("/familydetails/v1/familydetails-save",data,headers)
  }
  export const getFamilyDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/familydetails/v1/getfamilydetails?email=${email}`, headers)
  }
  export const putFamilyDetails = (data) => {
    const headers = getApiHeaders();
    return Api.put("/familydetails/v1/familydetails-update",data,headers)
  }
  export const postBankDetails = (data) => {
    const headers = getApiHeaders();
    return Api.post("/bankdetails/v1/bankdetails-save",data,headers)
  }
  export const getBankDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/bankdetails/v1/getbankdetails?email=${email}`, headers)
  }
  export const putBankDetails = (data) => {
    const headers = getApiHeaders();
    return Api.put("/bankdetails/v1/bankdetails-update",data,headers)
  }
  export const postEmergencyDetails = (data) => {
    const headers = getApiHeaders();
    return Api.post("/emergencydetails/v1/emergencydetails-save",data,headers)
  }
  export const getEmergencyDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/emergencydetails/v1/getemergencydetails?email=${email}`, headers)
  }
  export const updateEmergencyDetails = (data) => {
    const headers = getApiHeaders();
    return Api.put("/emergencydetails/v1/emergencydetails-update",data,headers)

  }
  export const postRaiseDisputeDetails = (data) => {
    const headers = getApiHeaders();
    return Api.post("/raisedisputedetails/v1/raisedisputedetails-save",data,headers)
  }
  export const getRaiseDisputeDetails = (email) => {
    const headers = getApiHeaders();
    return Api.get(`/raisedisputedetails/v1/getraisedisputedetails?email=${email}`, headers)
  }
  export const getAllAdminRegisterDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getadmindetails", headers)
  }
  export const getAllBankDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getbankdetails", headers)
  }
  export const getAllEmergencyDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getemergencydetails", headers)
  }
  export const getAllEmployeeDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getemployeedetails", headers)
  }
  export const getAllFamilyDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getfamilydetails", headers)
  }
  export const getAllPersonalDetails = () => {
    const headers = getApiHeaders();
    return Api.get("/admin/v1/getpersonaldetails", headers)
  }
  export const searchAdminRegisterDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchadminregister?query=${searchQuery}`, headers)
  }
  export const searchBankDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchbankdetails?query=${searchQuery}`, headers)
  }
  export const searchEmergencyDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchemergencydetails?query=${searchQuery}`, headers)
  }
  export const searchEmployeeDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchemployeedetails?query=${searchQuery}`, headers)
  }
  export const searchFamilyDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchfamilydetails?query=${searchQuery}`, headers)
  }
  export const searchPersonalDetails = (searchQuery) => {
    const headers = getApiHeaders();
    return Api.get(`/admin/v1/searchpersonaldetails?query=${searchQuery}`, headers)
  }
  export const deleteAdminRegisterDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deleteadminregister?email=${email}`, headers)
  }
  export const deleteBankDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deletebankdetails?email=${email}`, headers)
  }
  export const deleteEmergencyDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deleteemergemcydetails?email=${email}`, headers)
  }
  export const deleteEmployeeDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deleteemployeedetails?email=${email}`, headers)
  }
  export const deleteFamilyDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deletefamilydetails?email=${email}`, headers)
  }
  export const deletePersonalDetails = (email) => {
    const headers = getApiHeaders();
    return Api.delete(`/admin/v1/deletepersonaldetails?email=${email}`, headers)
  }