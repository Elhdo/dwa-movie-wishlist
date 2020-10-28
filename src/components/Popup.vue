<template lang="html">
  <div class="popup" v-if="hasPopup" @keyup.esc="close">
    <!-- Dynamic component through "is" binded attribute -->
    <component
      class="popup-inner"
      :is="popup.type"
      :content="popup.content"
      ref="box"
    />
    <button class="popup__close" @click="close">
      close
    </button>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
}
.popup-inner {
  border: 1px dotted white;
  padding: 4rem;
}
.popup__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
</style>

<script>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
} from '@vue/composition-api'
import PopupMovie from '@/components/popup/Movie.vue'
import PopupMessage from '@/components/popup/Message.vue'

// Need runtime compiler mode
// const PopupDefault = {
//   template: '<div>Default</div>',
// }

// Some map to pick the right component to replace <component />
const customPopup = {
  movie: PopupMovie,
  msg: PopupMessage,
}

export default defineComponent({
  name: 'Popup',
  setup(props, ctx) {
    const hasPopup = ref(false)
    const popup = reactive({
      type: PopupMessage,
      content: {},
    })
    // This is a 'ref' to a DOM element (in this specific case, a VueJS dynamic component)
    // It will be accessible ONLY after the mounted phase.
    const box = ref(null)

    // Composant pas monté -> ref null
    // console.info('SETUP', box.value)

    onMounted(() => {
      // Composant monté -> ref vue component, we can access the root DOM element with `$el`
      // console.info('MOUNTED', box.value.$el)
    })

    const close = () => {
      // We choose to use the watcher…
      // document.removeEventListener('click', outside)
      hasPopup.value = false
    }

    // Check if clicked element is outside of the popup
    const outside = e => {
      // Vanilla
      // const box = document.querySelector('.popup-inner')
      // v2
      // const { box } = this.$refs (this.$el)
      if (!e.target === box.value.$el || !box.value.$el.contains(e.target)) {
        close()
      }
    }

    const keydown = e => {
      e.key === 'Escape' && close()
    }

    // Watcher variant. You can listen to reactive changes…
    watch(hasPopup, (currentValue, previousValue) => {
      console.info('WATCH', 'to', currentValue, 'from', previousValue)

      // Manage event listeners based on popup status
      if (currentValue) {
        document.addEventListener('click', outside)
        document.addEventListener('keydown', keydown)
      } else {
        document.removeEventListener('click', outside)
        document.removeEventListener('keydown', keydown)
      }
    })

    ctx.root.$on('popup-open', (type, content) => {
      // Fallback to default component
      // popup.type = customPopup[type] || PopupDefault
      popup.type = customPopup[type]
      popup.content = content
      hasPopup.value = true

      // We choose to use the watcher…
      // document.addEventListener('click', outside)
    })

    return {
      hasPopup,
      popup,
      close,
      box,
      PopupMovie,
    }
  },
})
</script>
