import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: state,
    mutations: {
        set_token(state, data){
            state.userToken = data
        },
        clear_token(state){
            state.userToken = ''
        }
    }
})