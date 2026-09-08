export const getAuthV2Store = state => state.authV2
export const getRegisterV2Status = state => state.authV2.registerStatus
export const getRegisterV2Err = state => state.authV2.registerErr
export const getRegisteredV2Phone = state => state.authV2.registeredPhone
export const getVerifyPhoneV2Status = state => state.authV2.verifyPhoneStatus
export const getVerifyPhoneV2Err = state => state.authV2.verifyPhoneErr
export const getLoginV2Status = state => state.authV2.loginStatus
export const getLoginV2Err = state => state.authV2.loginErr
export const getIsLoggedInV2 = state => state.authV2.isLoggedInV2
export const getMeV2 = state => ({
  status: state.authV2.meStatus,
  identity: state.authV2.identity,
  activeCustomer: state.authV2.activeCustomer,
  role: state.authV2.role,
  allMemberships: state.authV2.allMemberships,
})
export const getMembershipsV2Status = state => state.authV2.membershipsStatus
export const getMembershipsV2 = state => state.authV2.memberships
export const getRegisterCustomerV2Status = state => state.authV2.registerCustomerStatus
export const getRegisterCustomerV2Err = state => state.authV2.registerCustomerErr
export const getKycV2Status = state => state.authV2.kycStatus
export const getKycV2 = state => state.authV2.kyc
export const getSubmitKycV2Status = state => state.authV2.submitKycStatus
export const getSubmitKycV2Err = state => state.authV2.submitKycErr
export const getUploadKycDocV2Status = state => state.authV2.uploadKycDocStatus
export const getUploadKycDocV2Err = state => state.authV2.uploadKycDocErr
export const getUploadedKycDocsV2 = state => state.authV2.uploadedKycDocs
