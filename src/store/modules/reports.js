import {
  getAll,
  getByShipId,
  Ins,
  UpdateIsDefault,
  UpdateAll,
  getByFour
} from '@/api/reports'

const reports = {
  state: {
    user: '',
    status: '',
    code: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 获取全部
    reportsSelectAll() {
      return new Promise((resolve, reject) => {
        getAll()
          .then(response => {
            // commit('SET_USERNAME', response.data.userName)
            // commit('SET_NAME', response.data.name)
            // commit('SET_AVATAR', response.data.avatar)
            // commit('SET_INTRODUCTION', response.data.introduction)
            resolve(response)
          })
          .catch(error => {
            if (error) {
              console.log(error)
            }
            reject(error)
          })
      })
    },
    // 获取指定燃料信息
    reportsSelectByShipId({ commit }, shipId) {
      return new Promise((resolve, reject) => {
        getByShipId(shipId)
          .then(response => {
            // commit('SET_USERNAME', response.data.userName)
            // commit('SET_NAME', response.data.name)
            // commit('SET_AVATAR', response.data.avatar)
            // commit('SET_INTRODUCTION', response.data.introduction)

            resolve(response)
          })
          .catch(error => {
            if (error) {
              console.log(error)
            }
            reject(error)
          })
      })
    },
    // 根据前四项数据模糊查询
    reportsSelectByFour({ commit }, str) {
      return new Promise((resolve, reject) => {
        getByFour(str)
          .then(response => {
            // commit('SET_USERNAME', response.data.userName)
            // commit('SET_NAME', response.data.name)
            // commit('SET_AVATAR', response.data.avatar)
            // commit('SET_INTRODUCTION', response.data.introduction)

            resolve(response)
          })
          .catch(error => {
            if (error) {
              console.log(error)
            }
            reject(error)
          })
      })
    },
    // 插入新数据
    insNew({ commit }, reports) {
      return new Promise((resolve, reject) => {
        Ins(reports)
          .then(response => {
            const data = response.data
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 改变isdefault的值
    changeIsDefault({ commit }, id) {
      return new Promise(resolve => {
        UpdateIsDefault(id).then(response => {
          // dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    },
    // 改变所有的数据
    changeAll({ commit }, reports) {
      return new Promise(resolve => {
        UpdateAll(reports).then(response => {
          // dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default reports
