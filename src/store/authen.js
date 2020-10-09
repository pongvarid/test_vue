import axios from "@/plugins/axios"
import _ from 'lodash'
import moment from 'moment';
import {
    make
} from "vuex-pathify"

const state = {
   
}

const getters = {


}

const mutations = make.mutations(state)


const actions = {
    
    async login(context, form) {
        let request = await axios.post('/api/login', form)
            .then((r) => {
                return r.data;
            })
            .catch((e) => {
                return e.response.data;
            })
        return request
    },
    async register(context, form) {
        let request = await axios.post('/api/register', form)
            .then((r) => {
                return r.data;
            })
            .catch((e) => {
                return e.response.data;
            })
        return request
    },

    async getTest(context, params) {
        let request = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then((r) => {
                state.RAW_DATA = r.data;
                return r.data
            }).catch((e) => {
                return e.response.data
            });
        
        return request
    },
     
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}