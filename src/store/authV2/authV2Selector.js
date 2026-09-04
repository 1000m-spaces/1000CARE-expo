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
