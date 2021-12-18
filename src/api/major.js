import request from '@/utils/request'

export function getAll(current, limit, queryParams) {
  return request({
    // url: `/major/list/${current}/${limit}`,
    url: `/major/list`,
    method: 'get'
    // params: queryParams
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
