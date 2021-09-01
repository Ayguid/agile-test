import Vue from 'vue'
import VueRouter from 'vue-router'
import GridView from '../views/GridView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GridView',
    component: GridView
  },
  {
    path: '/img/:id',
    name: 'ImgDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ImgDetail.vue'),
    props: true
  },
  {
    path: '*',
    component: GridView
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
