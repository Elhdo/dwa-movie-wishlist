<template>
  <main class="home">
    <h1>Movie wishlist</h1>
    <Listing :items="movies" />
  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import { mapGetters } from '@/store/utils'
import Listing from '@/components/Listing.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Listing,
  },
  setup(props, ctx) {
    return {
      ...mapGetters(ctx, ['movies']),
    }
  },
})
</script>
