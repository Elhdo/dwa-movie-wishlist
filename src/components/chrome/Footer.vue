<template>
  <footer class="footer">
    <img class="footer__logo" src="@/assets/logo-tmdb.svg" />
    <p class="footer__mention">
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'ChromeFooter',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/styles/utils';

.footer {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
}

.footer__logo {
  margin-right: 2rem;
  height: 100%;
}
</style>
