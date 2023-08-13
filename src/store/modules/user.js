import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import cookie from 'js-cookie'
const getDefaultState = () => {
  return {
    token: getToken(),
    loginInfo:{},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGININFO: (state, loginInfo) => {
    state.loginInfo=loginInfo
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { employNumber, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ employNumber: employNumber.trim(), password: password }).then(response => {
        const { data } = response
        if (!data) {
          this.$message({
            type: 'warning',
            message: '登录失败, 请重新登录'
          });
          return reject()
        }
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {

      reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { id,employNumber,employName,department,team,avatar} = data.loginInfo
        this.loginInfo = data.loginInfo
        commit('SET_LOGININFO',this.loginInfo)
        // //将用户信息记录cookie
        // cookie.set('sqm_logininfo', this.loginInfo, { domain: 'localhost'})
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

