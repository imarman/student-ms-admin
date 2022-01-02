import request from '@/utils/request'

// export function getTodayInfo(id) {
//   return request({
//     url: `/applying/list`,
//     method: 'get',
//     params: { studentId: id }
//   })
// }

export function getList(current, limit, params) {
  return request({
    url: `/applying/list/${current}/${limit}`,
    method: 'get',
    params: params
  })
}

export function getMyList(studentId, type) {
  return request({
    url: `/applying/my-list`,
    method: 'get',
    params: { studentId: studentId, type: type }
  })
}

export function save(data) {
  return request({
    url: `/applying/save`,
    method: 'post',
    data: data
  })
}

export function changeStatus(data) {
  return request({
    url: `/applying/changeStatus`,
    method: 'put',
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

