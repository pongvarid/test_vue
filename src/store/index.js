import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'; 
import test from './test';
import authen from './authen';
Vue.use(Vuex)

const modules = {
    test,
    authen
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})