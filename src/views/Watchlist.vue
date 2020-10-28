<template>
  <main class="watchlist">
    <h1>Watchlist</h1>
    <Listing :items="likes" />
  </main>
</template>

<script>
// More verbose option with a computed value rather than getter
// import { defineComponent, computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

import { mapGetters } from '@/store/utils'
import Listing from '@/components/Listing.vue'

export default defineComponent({
  name: 'Watchlist',
  components: {
    Listing,
  },
  setup(props, ctx) {
    // Via une computed
    // const { movies } = mapGetters(ctx, ['movies'])
    // const likes = computed(() => movies.value.filter(movie => movie.liked))

    return {
      // likes,
      ...mapGetters(ctx, { likes: 'moviesLiked' }),
    }
  },
})
</script>
