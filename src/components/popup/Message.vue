<template lang="html">
  <div class="popup-message">
    <h1>{{ content.message }}</h1>
  </div>
</template>

<style lang="scss" scope>
.popup-message {
  background-color: lime;
}
</style>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PopupMessage',
  props: {
    content: {
      type: Object,
      default: {},
    },
  },
})
</script>
