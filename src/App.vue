<template>
  <HeaderComponent :categories = "categories"
    :search-icon = "searchIcon"
    :search-show = "searchShow"
    :catalog = "catalog"
    :accessToken = "accessToken"
    :user="user"
    :number="number"
    @show-search = "showSearch"
    @close-search = "closeSearch"
    @catalog-open = "catalogOpen"
    @on-change-input-search = "onChangeInputSearch"
    @search-data-from-server="searchDataFromServer"
    @logout = "logout"
  />
  <RouterView
    @remove-from-cart="removeFromCart"
    @add-to-cart="addToCart"
    @liked-products = "likedProducts"
  />
  <FooterComponent/>
</template>

<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import {computed, onMounted, onUpdated, provide, ref, watch} from "vue";

import axios from "axios";
import {router} from "@/router/router.js";
import store from '@/store.js'
import api from "@/api.js";
import {useRoute} from "vue-router";

const route = useRoute()
const searchWord = ref('')
const catalog = ref(false)
const categories = ref([])
const products = ref([])
const accessToken = ref('')
const user = ref([])
const cart = ref([])
const qty = ref(1)
const id = route.params.id
const likedProducts = ref([])
const number = ref(true)

const showSearch = ()=>{
  store.dispatch('TOGGLE_SEARCH')
  number.value = false
}

const closeSearch = ()=>{
  store.dispatch('TOGGLE_SEARCH')
  number.value = true
}

const catalogOpen = ()=>{
  store.dispatch('TOGGLE_CATALOG')
}

const onChangeInputSearch = (event)=>{
  searchWord.value = event.target.value
}

const searchDataFromServer = async ()=>{
  router.push({ path: '/products', query: { search: searchWord.value } })
}

const getCategories =async ()=>{
  const {data} = await axios.get('http://localhost:8881/api/categories')
  categories.value = data
}

const getPersonal = async ()=>{
  if(!user.value) {
    store.dispatch('getUser').then((data)=>{
      user.value = data
    })
  }
}

const getAccessToken = async ()=> {
  if(localStorage.access_token == 'undefined'){
    localStorage.removeItem('access_token')
  }
  accessToken.value = localStorage.access_token
}

const logout = async ()=>{
  await  api.value.post('http://127.0.0.1:8881/api/auth/logout')
  localStorage.removeItem('access_token')
  router.push({name:'Login'})
}

const searchIcon = computed(() => {
  return store.getters.SEARCH_ICON_STATE
})

const searchShow = computed(() => {
  return store.getters.SEARCH_SHOW_STATE
})

const addToCart = (data)=>{
  const product = data[0]
  product.qty =data[1]
  cart.value.push(product)
  product.isAdded = true
}

const removeFromCart = (product)=>{
  cart.value = cart.value.filter(item => item.id == product.id);
  product.isAdded = false
}

const getLikedProducts = async ()=>{
  store.dispatch('getLikedProducts').then((data)=>{
    likedProducts.value = data.data
  })
}


onMounted(()=>{

  getAccessToken()

  if(accessToken.value){
    getPersonal()
    getLikedProducts()
  }

  getCategories()

  if(user.length > 0){
    store.dispatch('TOGGLE_ADMIN_OPEN')
  }else{
    store.dispatch('TOGGLE_ADMIN_CLOSE')
  }

})

onUpdated(()=>{
  accessToken.value = localStorage.access_token
  store.dispatch('TOGGLE_CATALOG_CLOSE')
})

watch(cart,()=>{
  localStorage.setItem('cart',JSON.stringify(cart.value))
},{deep:true})

watch(route,()=>{
  accessToken.value = localStorage.access_token
})
watch(likedProducts,()=>{

},)

provide('categories',categories)
provide('products',products)
provide('user',user)
provide('likedProducts',likedProducts)
</script>

<style scoped>

</style>
