import { getItem } from '@/utils/storage.js'
import { USER_ID, ACCOUNT_ID, ENTRY_PWD, IS_AUTO_LOGIN } from '@/utils/constants.js'

export default {
  namespaced: true,
  state: {
    // userid一定是account_id, account_id不一定是userid。不知道为什么前端传参是user_id, 后端返回是account_id
    account_id: getItem(ACCOUNT_ID),
    userid: getItem(USER_ID)
  },
  mutations: {
    /**
     * 更新userid
     * @param {Object} state
     * @param {Object} payload
     */
    setUserId(state, userid) {
      //
    },
    /**
     * 更新account_id
     * @param {Object} state
     * @param {Object} payload
     */
    setAccountId(state, account_id) {
      //
    },
    /**
     * 保存登录密码
     * @param {*} state
     * @param {*}  entry_pwd
     */
    setEntryPwd(state, entry_pwd) {
      //
    }
  },
  actions: {
    /**
     * login 登录
     * @param {Object} context
     * @param {Object} params
     * @returns
     */
    login(context, params) {
      //
    },

    /**
     * 注销, 退出登录
     * @param {Object} context
     */
    logout(context) {
      //
    }
  }
}
