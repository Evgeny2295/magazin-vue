<template>
  <div id="main-block">
    <main class="main">
      <div class="load cart__load" v-if="load">
        Load...
      </div>
      <section v-else class="main__block">
        <div class="container">
          <div class="cart">
            <h1 class="cart__title cart__title--black">Корзина</h1>
            <div v-if="products.length > 0" class="cart__info">
              <div class="cart__products cart__products--white">
                <table class="table cart__table">
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Стоимость</th>
                      <th>Количество</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="product in products">
                    <td class="cart__table-row">{{product.title}}</td>
                    <td class="cart__table-row">{{product.price}} Р</td>
                    <td class="cart__table-row"><input type="number" v-model="product.qty" value="1" class="w-25 text-center"></td>
                    <td class="cart__table-row"><button @click="removeFromCart(product)" type="button" class="w-75">Удалить</button></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="cart__order cart__order--white">
                <button @click="createOrder()" v-if="user" class="btn btn-success btn__order">Оформить</button>
                <div v-else>
                  <button type="button" class="btn btn-success btn__order"><router-link :to="{name:'Login'}">Войти</router-link></button>
                  <button type="button" class="btn btn-success btn__order"><router-link :to="{name:'Signup'}">Зарегистрироваться</router-link></button>
                </div>
                <table class="table">
                  <tr class="d-flex gap-5">
                    <td>Ваша корзина</td>
                    <td>{{ count }} товара (-ов)</td>
                  </tr>
                  <tr class="d-flex gap-5">
                    <td>Общая стоимость</td>
                    <td>{{sum}} Р</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="cart__empty" v-else>В корзину еще ничего не добавлено</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>

import {onMounted, ref, inject, onUpdated,watch} from "vue";
import api from "@/api.js";
import {addStyle} from "@/js/configStyle.js";
import store from "@/store.js";
import {router} from "@/router/router.js";

const products = ref([])
const orderProducts = ref([])
const load = ref(true)
const sum = ref(0)
const count = ref(0)
const user = ref()
const removeFromCart = (product)=>{
  const localCart = JSON.parse(localStorage.getItem('cart'))
  localCart.splice(localCart.indexOf(product),1)
  localStorage.setItem('cart',localCart)
  products.value = localCart
}

const createOrder = ()=>{
  orderProducts.value = products.value.map((product)=>({
    productId:product.id,
    qty:product.qty,
    price:product.price
  }))

  api.value.post("http://127.0.0.1:8881/api/auth/cart",{
    products:orderProducts.value
  })

  localStorage.removeItem('cart')
  products.value = []
}

const getPersonal = async ()=>{
  if(!user.value) {

    await store.dispatch('getUser').then((data)=>{
      if(!data){
        localStorage.removeItem('access_token')
        router.push({name:'Login'})
      }
      user.value = data

    })
  }
}

onMounted(async ()=>{
  await addStyle()
  await getPersonal()

  const localCart = localStorage.getItem('cart')
  products.value = localCart ? JSON.parse(localCart) : []
  products.value.map(product=>{sum.value += product.qty*product.price})
  products.value.map(product=>{count.value += product.qty})

  setTimeout(()=>{
    load.value = false
  },700)
})

watch(products,()=>{
  sum.value = 0
  count.value = 0
  products.value.map(product=>{sum.value += product.qty*product.price})
  products.value.map(product=>{count.value += product.qty})
  localStorage.setItem('cart',JSON.stringify(products.value))
},{deep:true})

</script>

<style scoped>

</style>