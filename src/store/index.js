import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'
import db from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    db
  },
  state: {
    mode: 'normal',
    modeData: undefined,
    swStatus: 'pending',
    messages: []
  },
  mutations: {
    switchMode (state, payload) {
      state.mode = payload.mode || payload
      state.modeData = payload.data
    },
    swUpdate (state, status) {
      state.swStatus = status
    },
    alert (state, payload) {
      if (typeof payload === 'string') {
        state.messages.push({
          text: payload,
          type: 'warning'
        })
      } else state.messages.push(payload)
    }
  },
  actions: {
    async init (context) {
      await context.dispatch('config/init')
      await context.dispatch('db/init')
    }
  }
})
