import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// v2: Event Emitter
// const ee = new Vue()

// Object.defineProperties(Vue.prototype, {
//   $ee: {
//     get() {
//       return ee
//     },
//   },
// })

import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import VueSvgSprite from 'vue-svg-sprite'
Vue.use(VueSvgSprite, {
  url: require('@/assets/sprite.svg'),
})

import VueStorage, { STORAGE } from './plugins/storage'
Vue.use(VueStorage, STORAGE.LOCAL)

// BONUS: lazy loading

// Adding a directive `v-lazy`
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// Adding a `<v-lazy-image>` component
import { VLazyImagePlugin } from 'v-lazy-image'
Vue.use(VLazyImagePlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
