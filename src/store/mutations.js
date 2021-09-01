const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
    localStorage.setItem('access_token', JSON.stringify(state.access_token))
  },
  SET_IMAGES(state, payload) {
    state.images = payload
  },
}
export default mutations