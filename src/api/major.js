import request from '@/utils/request'

export function getAllMajor(current, limit, queryParams) {
  return request({
    url: `/major/list/${current}/${limit}`,
    method: 'get',
    params: queryParams
  })
}

export function listByCollege(params) {
  return request({
    url: `/college/listByCollege`,
    method: 'get',
    params: params
  })
}

export function deleteById(id) {
  return request({
    url: `/major/delete/${id}`,
    method: 'delete'
  })
}

export function save(data) {
  return request({
    url: `/major/saveOrUpdate`,
    method: 'post',
    data: data
  })
}
