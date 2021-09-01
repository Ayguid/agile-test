import axios from 'axios'

const API_URL = 'http://interview.agileengine.com/'
const API_KEY = '23567b218376f79d9415'

const actions = {
  async getAccessToken({ commit }) {
    if (!this.state.access_token) {// if no token present, i know still more validation needed,,,
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
    //console.log(response)
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