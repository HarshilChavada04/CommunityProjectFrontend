import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
// import { useAuthStore } from 'src/stores/auth'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER ? createMemoryHistory : createWebHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    // const auth = useAuthStore()
    // const token = auth.accessToken
    // const blnIsLogedIn = !!token

    // if ((to.path === '/' || to.path === '/login') && blnIsLogedIn) {
    //   next('/dashboard')
    // } else if (to.path !== '/' && to.path !== '/login' && !blnIsLogedIn) {
    //   next('/login')
    // } else {
    //   next()
    // }

    next()
  })

  return Router
})
