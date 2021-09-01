
const state = {
  access_token: JSON.parse(localStorage.getItem('access_token')) || '',
  images: {},
}

export default state