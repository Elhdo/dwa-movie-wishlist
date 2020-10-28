<template>
  <transition-group
    name="staggered-fade"
    tag="ul"
    :class="`listing--${view}`"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <li class="item" v-for="item in items" :key="item.id">
      <h2 class="item__title" @click="toggle(item)">{{ item.title }}</h2>
      <img
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        class="item__poster"
        :alt="item.title"
        v-if="view === 'grid'"
        @click.stop="show(item)"
      />
      <!-- Lazy loading -->
      <!-- <img
        v-lazy="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        class="item__poster"
        :alt="item.title"
        v-if="view === 'grid'"
        @click.stop="show(item)"
      /> -->
      <!-- <v-lazy-image
        class="item__poster"
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        src-placeholder="http://lorempixel.com/400/200/""
        :alt="item.title"
        v-if="view === 'grid'"
        @click.stop="show(item)"
      /> -->
      <button
        type="button"
        class="item__like like"
        :class="{ liked: item.liked }"
        @click="toggle(item)"
      >
        <Icon :icon="{ symbol: 'heart' }" />
      </button>
    </li>
  </transition-group>
</template>

<style lang="scss" scoped>
@import '@/styles/utils';

[class*='listing--'][class*='--grid'] {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  grid-auto-rows: 24rem;

  @include mq(l) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mq(xl) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include mq(xxl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.item,
[class*='item--'] {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;

  [class*='listing--'][class*='--list'] > & {
    border-bottom: 1px solid $c-dark;
  }
}

.item__title {
  position: relative;
  z-index: 1;
  padding: 1rem 1.5rem;

  font-size: 2rem;
  line-height: 1.1;
  will-change: transform;

  > * {
    will-change: transform, opacity;
  }

  [class*='listing--'][class*='--grid'] & {
    background-image: linear-gradient(
      to top,
      $c-black 0%,
      rgba($c-black, 0.35)
    );
  }
}

.item__poster {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: opacity;
}

.item__like {
  position: absolute;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
}

.like,
[class*='like--'] {
  border: 0;
  padding: 0;
  background: none;
  fill: $c-white;
  opacity: 0.65;
  transition: fill 0.25s ease-in-out, opacity 0.25s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 0;
    opacity: 1;
    fill: $c-gold;
  }

  &.liked {
    opacity: 1;
    fill: $c-pink;
  }

  svg {
    display: block;
    width: 2.4rem;
    height: 2.4rem;

    [class*='listing--'][class*='--list'] & {
      transform: scale(0.6);
    }
  }
}
</style>

<script>
import { defineComponent } from '@vue/composition-api'
import gsap from 'gsap'

import { mapMutations } from '@/store/utils'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  name: 'Listing',
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    view: {
      type: String,
      default: 'grid',
    },
  },
  setup(props, ctx) {
    const beforeEnter = el => {
      el.style.opacity = 0
      el.style.height = 0
    }
    // Async/await mode
    const enter = async (el, done) => {
      const delay = (el.dataset.index * 50) / 1000

      await gsap.to(el, {
        opacity: 1,
        height: '43px',
        duration: 1,
        delay,
      })

      done()
    }

    // Promise mode
    // const enter = (el, done) => {
    //   const delay = el.dataset.index * 150
    //   gsap
    //     .to(el, {
    //       opacity: 1,
    //       height: '43px',
    //       duration: 1,
    //       delay,
    //     })
    //     .then(done)
    // }

    // Callback (aka old school) mode
    // const enter = (el, done) => {
    //   const delay = el.dataset.index * 150
    //   gsap.to(el, {
    //     opacity: 1,
    //     height: '43px',
    //     duration: 1,
    //     delay,
    //     onComplete: done,
    //   })
    // }

    const leave = async (el, done) => {
      const delay = (el.dataset.index * 50) / 1000

      await gsap.to(el, {
        opacity: 0,
        height: 0,
        duration: 1,
        delay,
      })

      done()
    }
    const show = item => {
      // Vue2 this.$emit('custom-event', item, item.title)
      // this.$busEvent.$emit
      // ctx.root.$ee.$emit('custom-event', item, item.title)
      const { title, id } = item
      ctx.root.$emit('popup-open', 'movie', { title, message: id })
    }

    // Vue2 this.$on('custom-event', cb)
    // ctx.root.$on('custom-event', item => {
    //   console.info('ON', item.title)
    // })

    // Get and rename the mutation
    const { toggleLike } = mapMutations(ctx, { toggleLike: 'TOGGLE_LIKE' })
    // Enhance payload with context
    const toggle = item => toggleLike({ item, vm: ctx.root })

    return {
      toggle,
      beforeEnter,
      enter,
      leave,
      show,
    }
  },
})
</script>
