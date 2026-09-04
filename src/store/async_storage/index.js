import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_SCHEMA_KEY = 'auth_session_schema'
const AUTH_KEYS = ['user', 'token', 'refresh_token']
// Token của backend mới marketplace-core — key riêng, KHÔNG chung với
// AUTH_KEYS (token cũ) vì 2 hệ auth độc lập, chạy song song.
const AUTH_V2_KEYS = ['v2_access_token', 'v2_refresh_token', 'v2_active_customer_id']

const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    console.log(e)
  }
}

const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if (value !== null) {
      console.log(value)
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      console.log(value)
      return value
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (e) {
    console.log(e)
  }
}

const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('refresh_token')
    if (value !== null) {
      console.log(value)
      return value
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const setRefreshToken = async (refreshToken) => {
  try {
    await AsyncStorage.setItem('refresh_token', refreshToken)
  } catch (e) {
    console.log(e)
  }
}

const clearAll = async () => {
  try {
    const skip = await AsyncStorage.getItem('skipForceUpdate')
    await AsyncStorage.clear()
    await AsyncStorage.setItem('skipForceUpdate', skip)
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}

const clearAuthSession = async () => {
  try {
    await AsyncStorage.multiRemove(AUTH_KEYS)
  } catch (e) {
    console.log(e)
  }
}

const getV2AccessToken = async () => {
  try {
    return await AsyncStorage.getItem('v2_access_token')
  } catch (e) {
    console.log(e)
  }
  return null
}

const setV2AccessToken = async token => {
  try {
    await AsyncStorage.setItem('v2_access_token', token || '')
  } catch (e) {
    console.log(e)
  }
}

const getV2RefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('v2_refresh_token')
  } catch (e) {
    console.log(e)
  }
  return null
}

const setV2RefreshToken = async token => {
  try {
    await AsyncStorage.setItem('v2_refresh_token', token || '')
  } catch (e) {
    console.log(e)
  }
}

const getV2ActiveCustomerId = async () => {
  try {
    return await AsyncStorage.getItem('v2_active_customer_id')
  } catch (e) {
    console.log(e)
  }
  return null
}

const setV2ActiveCustomerId = async customerId => {
  try {
    await AsyncStorage.setItem('v2_active_customer_id', customerId || '')
  } catch (e) {
    console.log(e)
  }
}

const clearAuthV2Session = async () => {
  try {
    await AsyncStorage.multiRemove(AUTH_V2_KEYS)
  } catch (e) {
    console.log(e)
  }
}

const getAuthSessionSchema = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_SCHEMA_KEY)
  } catch (e) {
    console.log(e)
  }
  return null
}

const setAuthSessionSchema = async (schema) => {
  try {
    await AsyncStorage.setItem(AUTH_SCHEMA_KEY, schema)
  } catch (e) {
    console.log(e)
  }
}

const setSkipForceUpdate = async (skip) => {
  try {
    await AsyncStorage.setItem('skipForceUpdate', skip)
  }catch(e) {
    console.log(e)
  }
}

const getSkipForceUpdate = async () => {
  try{
    const value = await AsyncStorage.getItem('skipForceUpdate')
    if(value == 'true') {
      return 'true'
    } else {
      console.log('SKIP_FORCE_UPDTE:',value)
      return 'false'
    }
  }catch(e){
    console.log(e)
  }
}

export default {
  setUser,
  getUser,
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  clearAll,
  clearAuthSession,
  getAuthSessionSchema,
  setAuthSessionSchema,
  getSkipForceUpdate,
  setSkipForceUpdate,
  getV2AccessToken,
  setV2AccessToken,
  getV2RefreshToken,
  setV2RefreshToken,
  getV2ActiveCustomerId,
  setV2ActiveCustomerId,
  clearAuthV2Session,
}
