import request from '@/utils/request'

// export function getTodayInfo(id) {
//   return request({
//     url: `/applying/list`,
//     method: 'get',
//     params: { studentId: id }
//   })
// }

export function getList(data) {
  return request({
    url: `/applying/list`,
    method: 'get',
    params: data
  })
}

export function getMyList(studentId) {
  return request({
    url: `/applying/my-list`,
    method: 'get',
    params: { studentId: studentId }
  })
}

export function save(data) {
  return request({
    url: `/applying/save`,
    method: 'post',
    data: data
  })
}

export function deleteById(id) {
  return request({
    url: `/applying/delete`,
    method: 'delete',
    params: { id: id }
  })
}

