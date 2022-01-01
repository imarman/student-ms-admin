import request from '@/utils/request'

export function getTodayInfo(id) {
  return request({
    url: `/daily/get-today-info`,
    method: 'get',
    params: { studentId: id }
  })
}

export function getList(current, limit, data) {
  return request({
    url: `/daily/list/${current}/${limit}`,
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: `/daily/save`,
    method: 'post',
    data: data
  })
}
