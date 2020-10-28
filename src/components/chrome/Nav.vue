<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link class="nav__item__link" to="/">Home</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__item__link" to="/search">Search</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__item__link" to="/watchlist"
          >Watchlist</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ChromeNav',
}
</script>

<style lang="scss">
@import '@/styles/utils';

.nav__item {
  border-bottom: 1px solid $c-darker;
}

.nav__item__link {
  display: block;
  padding: 2rem;
  color: $c-light;
  text-decoration: none;
  transition: background-color 0.35s ease-in-out;

  &:hover {
    background-color: $c-darker;
  }

  &.router-link-exact-active {
    background-color: lighten($c-dark, 10%);
    pointer-events: none;
  }
}
</style>
