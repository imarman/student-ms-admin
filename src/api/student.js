import request from '@/utils/request'

export function getAllStudent(current, limit, queryParams) {
  return request({
    url: `/student/list/${current}/${limit}`,
    method: 'get',
    params: queryParams
  })
}

export function deleteById(id) {
  return request({
    url: `/student/delete/${id}`,
    method: 'delete'
  })
}

export function save(data) {
  return request({
    url: `/student/saveOrUpdate`,
    method: 'post',
    data: data
  })
}
