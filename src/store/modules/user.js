/**
 * @description 登录、获取用户信息、退出登录、清除accessToken
 */

import { Modal, Message } from 'ant-design-vue'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import { tokenName } from "@/config/settings";

const getDefaultState = () => {
  return {
    accessToken: getToken(),
    username: '',
    avatar: '',
    roles: [] // 角色权限
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8 ? '早上好'
        : hour <= 11 ? '上午好'
        : hour <= 13 ? '中午好'
        : hour < 18 ? '下午好'
        : '晚上好'
      Message.success({
        content: `欢迎登录, ${thisTime}！`,
        duration: 5 
      })
    } else {
      Message.error({
        content: `登录接口异常，未正确返回${tokenName}...`,
        duration: 5 
      })
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getInfo(state.accessToken)
    if (!data) {
      Message.error('验证失败，请重新登录...')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      console.log(permissions)
      commit('SET_ROLES', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Message.error('用户信息接口异常')
      return false
    }
  },
  async logout({ dispatch }) {
    // await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('SET_ROLES', [])
    commit('setAccessToken', '')
    removeToken()
  },
}
export default { state, mutations, actions }
