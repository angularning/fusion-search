/** 全局变量设置和配置**/

import axios from 'axios' // 引用axios
// import Qs from 'qs'

axios.defaults.timeout = 500000 // 设置接口响应时间

// if (location.hostname === 'localhost') {
//   axios.defaults.baseURL = process.env.API_HOST_DEV
// } else if (location.hostname === 'test') {
//   axios.defaults.baseURL = process.env.API_HOST_TEST
// } else if (location.hostname === 'production') {
//   axios.defaults.baseURL = process.env.API_HOST_PROD
// }
axios.defaults.baseURL = 'http://192.168.41.84:8000/'

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    //     if (config.url === '/login/checkLogin') {
    //       config.headers = {
    //         'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    //       }
    //       config.data = Qs.stringify(config.data)
    //     } else if (config.url === '/b/carModel/createCarModelVersion') {
    //       // 此处设置文件上传，配置单独请求头
    //       config.headers = {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     } else {
    //       let userInfo = localStorage.getItem('userInfo')
    //       if (userInfo === null) {
    //         return null
    //       }
    //       let bToken = localStorage.getItem('btoken')
    //       if (bToken === null) {
    //       } else {
    //         config.data.vwToken = bToken
    //       }
    //
    //     }
    config.headers = {
      // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJuYW1lIjoiXHU5ZWM0XHU3OTZmXHU2MDAwIiwiZXh0cmEiOiIyMDIxLTA2LTIxIDE0OjI4OjU1In0.ouu7LQWMwl1cDW-gmr8bEROhCiOnbMyL3mKy6QNTS4U' // 设置跨域头部
    }
    //     config.data = Qs.stringify(config.data)
    return config
  }
//   err => {
//     return Promise.reject(err)
//   }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log('请求拦截返回参数', response)
    // if (response.status === 200) {
    //   // 成功
    //   let returnCode = response.data.code
    //   if (returnCode > 10000 && returnCode < 20000) {
    //     // console.log('成功', response)
    //     $toast.show(response.data.msg)
    //   } else if (returnCode >= 20000 && returnCode < 30000) {
    //     // 只弹窗，不操作
    //     // console.log('失败1', response)
    //     $toast.show(response.data.msg)
    //   } else if (returnCode >= 30000 && returnCode < 40000) {
    //     // 只弹窗，点击跳到登入页
    //     localStorage.removeItem('userInfo')

    //     $toast.show('重新登录1')
    //     .then(() => {
    //       // console.log('此处应退出登录  重新实例化')
    //       router.push({ path: '/login' })
    //     })
    //   }
    // }
    return response
  },
  error => {
    // console.log('error', error.toString())
    // if ( error.toString().trim() ==="TypeError: Cannot read property 'cancelToken' of null") {
    //     localStorage.removeItem('userInfo')
    //     $toast.show('重新登录2')
    //     .then(() => {
    //       //  console.log('此处应退出登录  重新实例化')
    //       router.push({ path: '/login' })
    //     })
    // }

    // // console.log(error.toString().trim())
    // if (error.toString().trim() === 'Error: Network Error') {
    //  $toast.show('网络请求异常，请稍后重试', '出错了')
    //   callback: action => {}
    // }
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
