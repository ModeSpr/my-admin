import Cookies from 'js-cookie'

// const TokenKey = 'my_admin__token'
import { tokenName } from "../config/settings";

export function getToken() {
  return Cookies.get(tokenName)
}

export function setToken(token) {
  return Cookies.set(tokenName, token)
}

export function removeToken() {
  return Cookies.remove(tokenName)
}
