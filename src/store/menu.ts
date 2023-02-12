import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    opened: null as null | number
  })
})
