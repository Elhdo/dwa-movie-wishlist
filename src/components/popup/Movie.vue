<template lang="html">
  <div class="popup-movie">
    <h1>{{ content.title }}</h1>
  </div>
</template>

<style lang="scss" scope>
.popup-movie {
  background-color: gold;
}
</style>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PopupMovie',
  props: {
    content: {
      type: Object,
      default: {},
    },
  },
})
</script>
