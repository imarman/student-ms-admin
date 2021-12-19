import request from '@/utils/request'

export function getManagerInfo(id) {
  return request({
    url: '/user-center/manager/userinfo',
    method: 'get',
    params: { 'id': id }
  })
}

export function updateManagerInfo(data) {
  return request({
    url: `/user-center/changeManagerInfo`,
    method: 'put',
    data: data
  })
}

export function getStudentInfo(id) {
  return request({
    url: '/user-center/student/userinfo',
    method: 'get',
    params: { 'id': id }
  })
}

export function updateStudentInfo(data) {
  return request({
    url: `/user-center/changeStudentInfo`,
    method: 'put',
    data: data
  })
}

export function changePwd(data) {
  return request({
    url: `/user-center/changePwd`,
    method: 'put',
    data: data
  })
}
