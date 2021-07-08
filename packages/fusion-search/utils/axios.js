/** 全局变量设置和配置**/

import newAxios from 'axios' // 引用axios

const axios = newAxios.create({
  timeout: 500000
})
// eslint-disable-next-line new-cap
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
