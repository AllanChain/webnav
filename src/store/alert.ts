import { defineStore } from 'pinia'

export interface AlertMessage {
  text: string
  type: 'warning' | 'success' | 'error'
  delay?: number
  break?: boolean
}
export interface AlertState {
  messages: AlertMessage[]
}
export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    messages: []
  }),
  actions: {
    push (payload: string | AlertMessage) {
      if (typeof payload === 'string') {
        this.messages.push({
          text: payload, type: 'warning'
        })
      } else this.messages.push(payload)
    }
  }
})
