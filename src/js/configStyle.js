export function addStyle(){
    document.querySelector('.header').classList.add("header-products")
    document.querySelector('.header__btn').classList.add('hidden')
}
export function removeStyle(){
    document.querySelector('.header').classList.remove("header-products")
    document.querySelector('.header__btn').classList.remove('hidden')
}


