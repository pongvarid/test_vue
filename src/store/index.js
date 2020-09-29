import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'; 
import test from './test';
Vue.use(Vuex)

const modules = {
    test
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})