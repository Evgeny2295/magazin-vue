<template>
  <div class="footer">
    <div class="container">
      <div class="footer__flex">
        <ul class="footer__list">
          <li class="footer__item"><a href="#" class="footer__link">Главная</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Каталог</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Коллекции</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Дегустация</a></li>
          <li class="footer__item"><a href="#" class="footer__link">Контакты</a></li>
        </ul>
        <table class="footer__table">
          <tbody>
            <tr>
              <td>Винный бутик</td>
            </tr>
            <tr>
              <td>8(812)123-45-67</td>
            </tr>
            <tr class="d-flex gap-3">
              <td><img src="@/assets/images/vk.png" alt=""></td>
              <td><img src="@/assets/images/facebook.png" alt=""></td>
              <td><img src="@/assets/images/youtube.png" alt=""></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>

</style>