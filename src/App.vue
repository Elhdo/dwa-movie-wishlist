<template>
  <div id="app" class="site">
    <ChromeNav class="site__nav" />
    <transition name="fade" mode="out-in">
      <router-view class="site__main" />
    </transition>
    <ChromeFooter class="site__footer" />
    <Popup />
  </div>
</template>

<style lang="scss">
@import '@/styles/utils';
@import '@/styles/global';
.site__main {
  will-change: opacity, transform;
}

.fade-enter-active {
  transition: all 0.8s ease-in-out;
}
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 1;
}
</style>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapMutations } from '@/store/utils'

import ChromeFooter from '@/components/chrome/Footer.vue'
import ChromeNav from '@/components/chrome/Nav.vue'
import Popup from '@/components/Popup.vue'

export default defineComponent({
  name: 'App',
  components: {
    ChromeFooter,
    ChromeNav,
    Popup,
  },
  setup(props, ctx) {
    // Get likes from storage and update store
    const { setLikes } = mapMutations(ctx, { setLikes: 'SET_LIKES' })
    const savedLikes = ctx.root.$storage.getItem('likes')

    savedLikes && setLikes(JSON.parse(savedLikes))
  },
})
</script>
