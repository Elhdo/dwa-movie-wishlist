<template>
  <main class="search">
    <h1 class="search__title">Search</h1>
    <input
      type="text"
      name="search"
      id="search"
      class="search__input"
      v-model="search"
    />
    <Listing :items="results" view="list" />
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/utils';

.search__title {
  margin-bottom: 2rem;
}
.search__input {
  margin-bottom: 2rem;
  padding: 0.5em 1em;
  border: 1px solid $c-dark;
  color: rgba($c-light, 0.5);
  background-color: transparent;

  &:focus {
    border-color: $c-light;
    outline: none;
  }
}
</style>

<script>
import { defineComponent, computed, ref } from '@vue/composition-api'

import { mapGetters } from '@/store/utils'
import Listing from '@/components/Listing.vue'

export default defineComponent({
  name: 'Search',
  components: {
    Listing,
  },
  setup(props, ctx) {
    // Create ref for v-model -> input value auto binded
    const search = ref('')
    // Get movies list
    const { movies } = mapGetters(ctx, ['movies'])
    // Filtered list based on search value
    const results = computed(() =>
      movies.value.filter(movie =>
        movie.title.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    return {
      search,
      results,
    }
  },
})
</script>
