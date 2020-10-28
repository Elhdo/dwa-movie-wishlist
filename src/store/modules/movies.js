import data from '@/inc/movies.json'

const state = {
  data: data.results.map(m => {
    m.liked = false

    return m
  }),
}

const getters = {
  movies: state => state.data,
  moviesLiked: state => state.data.filter(movie => movie.liked),
}

const mutations = {
  SET_MOVIES(state, movies) {
    if (movies) {
      state.data = movies
    }
  },
  SET_LIKES(state, liked) {
    if (liked) {
      const ids = liked.map(m => m.id)

      state.data.forEach(m => {
        if (ids.includes(m.id)) {
          m.liked = true
        }
      })
    }
  },
  TOGGLE_LIKE(state, { item, vm }) {
    item.liked = !item.liked
    vm.$storage.setItem('likes', JSON.stringify(getters.moviesLiked(state)))
  },
}

const actions = {
  async fetchMovies({ commit }, payload) {
    commit('SET_MOVIES', payload)
  },
}

export const movies = {
  state,
  getters,
  mutations,
  actions,
}
