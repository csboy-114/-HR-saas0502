import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    if (result) {
      // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
      // 现在有用户token
      // actions 修改state 必须通过mutations
      context.commit('setToken', result)
      setTimeStamp()
    }
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return result
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
