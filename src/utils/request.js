import axios from 'axios'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/1375755420c0e2d58a88d262c1f62d7c/boss/'
})
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
let isRefreshing = false
let requests = []
request.interceptors.response.use(response => {
  return response
}, async error => {
  if (error.response) {
    if (error.response.status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (isRefreshing) {
        return request.push(() => {
          request(error.config)
        })
      }
      isRefreshing = true
      const { data } = await request({
        method: 'POst',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        redirectLogin()
        store.commit('setUser', null)
        return Promise.reject(error)
      }
      store.commit('setUser', data.content)
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
}
)
export default request
