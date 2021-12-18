import request from '@/utils/request'

export function getAll(current, limit, queryParams) {
  return request({
    url: `/college/list`,
    method: 'get'
    // params: queryParams
  })
}

export function deleteById(id) {
  return request({
    url: `/college/delete/${id}`,
    method: 'delete'
  })
}

export function save(data) {
  return request({
    url: `/college/saveOrUpdate`,
    method: 'post',
    data: data
  })
}
