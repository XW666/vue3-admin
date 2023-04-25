import {
  defineStore
} from 'pinia';
import { getToken, setToken, removeToken } from "@/utils/auth"
import { type ILoginRequestData } from "@/api/types/login";


// 传入2个参数，定义仓库并导出
// 第一个参数唯一不可重复，字符串类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions


export const useUserStore = defineStore('user', {
  // state 类似组件的data选项，函数形式返回对象
  state: () => {
    return {
      token: getToken(),
      name: 'sfefwet',
      avatar: '',
    }
  },
  getters: {},
  actions: {
    login(loginData: ILoginRequestData) {
      return new Promise((resolve, reject) => {
        this.name = loginData.username;
        setToken('dawtgyt54')
        resolve(true)
      })
    },
    logout() {
      removeToken()
    }
  }
})