import { defineStore } from "pinia";
import  api  from "../api";
import { useAppStore } from './app'
export const useUserStore = defineStore({
  id: "user", // id必填，且需要唯一
  state: () => {
    return {
      name: "马云是我的偶像小马哥",
    };
  },
  actions: {
    updateName(name: any) {
      this.name = name;
    },
    async login(account: string, pwd: string) {
      const { data } = await api.login(account, pwd);
      const appStore = useAppStore()
      appStore.setData(data) // 调用 app store 里的 action 方法
      this.setData(data); // 调用另一个 action 的方法
      return data;
    },
    setData(data: object) {
      console.log(data);
    },
  },
  getters: {
    fullName: (state: any) => {
      return state.name + "不错的目标";
    },
  },
});
