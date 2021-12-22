import request from '@/utils/request'

export function getAllAttendance(current, limit, queryParams) {
  return request({
    url: `/attendance/list/${current}/${limit}`,
    method: 'get',
    params: queryParams
  })
}

export function deleteById(id) {
  return request({
    url: `/attendance/delete/${id}`,
    method: 'delete'
  })
}

export function save(data) {
  return request({
    url: `/attendance/saveOrUpdate`,
    method: 'post',
    data: data
  })
}
