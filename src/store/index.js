import Vue from 'vue'
import Vuex from 'vuex'
import breed from './breed.store';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        breed
    }
})
