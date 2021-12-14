import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/sys/sysUser/getInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'get'
  })
}
