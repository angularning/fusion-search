/** 全局变量设置和配置**/

import axios from 'axios' // 引用axios
// import Qs from 'qs'

axios.defaults.timeout = 500000 // 设置接口响应时间
// const config = JSON.parse(sessionStorage.getItem('FUSIONCONFIG') && sessionStorage.getItem('FUSIONCONFIG'))
// // const configUrl = config.APIHOST || 'http://47.93.91.115:7150/v1/api/'
// const configUrl = (config && config.APIHOST) || 'http://192.168.41.84:8000/v1/api/'
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    config.headers = {
    }
    return config
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  }
)

export default axios

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function $get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function $post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        // console.log(response.data.code)
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
