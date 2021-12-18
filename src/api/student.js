import request from '@/utils/request'

export function getAll(current, limit, queryParams) {
  return request({
    url: `/student/list/${current}/${limit}`,
    method: 'get',
    params: queryParams
  })
}

export function deleteById(id) {
  return request({
    url: `/teacher/delete/${id}`,
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
