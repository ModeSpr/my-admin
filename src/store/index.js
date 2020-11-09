/**
 * @description 导入所有 vuex 模块
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
// 加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
const store = new Vuex.Store({
  modules,
  getters
})
export default store
