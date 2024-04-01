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
  return Api.get(`/reg?email=${email}`, headers);
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
    return Api.put("/personalupdateDetails",data1,headers)
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