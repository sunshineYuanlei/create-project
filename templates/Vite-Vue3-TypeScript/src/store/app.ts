import { defineStore } from "pinia";
export const useAppStore = defineStore({
    id: 'app',
    actions: {
      setData(data: object) {
        console.log(data)
      }
    }
  })