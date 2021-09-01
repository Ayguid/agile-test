import axios from 'axios'

const API_URL = 'http://interview.agileengine.com/' /* should be served over https for deploy to work on GHpages */
const API_KEY = '23567b218376f79d9415' //move to config file
/*token could be added to all req headers */

const actions = {
  async getAccessToken({ commit }) {
    if (!this.state.access_token) {// if no token present, still more validation/cleaning needed,,,
      const response = await axios({
        method: 'post',
        url: API_URL + 'auth',
        headers: {},
        data: {
          apiKey: API_KEY,
        }
      })
      //console.log(response)
      if (response.status == '200') {
        commit('SET_ACCESS_TOKEN', response.data.token)
        return true
      }
    } else { //if token present
      return true
    }
  },
  async resetToken({ commit, dispatch }) {
    commit('SET_ACCESS_TOKEN', "")
    return dispatch('getAccessToken');
  },
  async getImages({ commit }, page) {
    const response = await axios({
      method: 'get',
      url: API_URL + 'images/?page=' + page,
      headers: {
        Authorization: "Bearer " + this.state.access_token
      }
    })
    if (response.status == '200') {
      commit('SET_IMAGES', response.data)
      return true
    }

  },
  // eslint-disable-next-line no-unused-vars
  async getImage({ commit }, id) {
    const response = await axios({
      method: 'get',
      url: API_URL + 'images/' + id,
      headers: {
        Authorization: "Bearer " + this.state.access_token
      }
    })
    return response.data
  }
}

export default actions