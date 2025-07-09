import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
  }),
  actions: {
    setToken(token) {
      this.accessToken = token
    },
    clearToken() {
      this.accessToken = null
    },
  },
  persist: true,
})
