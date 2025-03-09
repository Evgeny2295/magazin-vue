import {createStore} from 'vuex'
import axios from "axios";
import api from "@/api.js";
import {router} from "@/router/router.js";

const store = createStore({
    state:{
        searchShow: false,
        searchIcon: true,
        favorite: false,
        catalogOpen: false,
    },
    mutations:{
        CHANGE_SEARCH: (state)=>{
            state.searchShow = !state.searchShow
            state.searchIcon = !state.searchIcon
        },
        CHANGE_FAVORITE: (state)=>{
            state.favorite = !state.favorite
        },
        CHANGE_CATALOG: (state)=>{
            state.catalogOpen = !state.catalogOpen
        },
        CHANGE_CATALOG_CLOSE: (state)=>{
            state.catalogOpen = false
        },


    },
    actions:{
        TOGGLE_SEARCH({commit}){
            commit('CHANGE_SEARCH')
        },
        TOGGLE_FAVORITE({commit}){
            commit('CHANGE_FAVORITE')
        },
        TOGGLE_CATALOG({commit}){
            commit('CHANGE_CATALOG')
        },
        TOGGLE_CATALOG_CLOSE({commit}){
            commit('CHANGE_CATALOG_CLOSE')
        },
        async getLikedProducts(){
            const data = await api.value.get('http://127.0.0.1:8881/api/auth/wishlist')
            if(data.data) return data.data
        },
        async getUser(){
            const data = await api.value.get('http://127.0.0.1:8881/api/auth/personal')
            if(data) return data.data
        }

    },
    getters:{
        SEARCH_SHOW_STATE(state){
            return state.searchShow
        },
        SEARCH_ICON_STATE(state){
            return state.searchIcon
        },
        SEARCH_FAVORITE_STATE(state){
            return state.favorite
        },
        SEARCH_CATALOG(state){
            return state.catalogOpen
        }
    }
})

export default store;