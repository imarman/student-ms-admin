import request from '@/utils/request'

export function getTodayInfo(id) {
  return request({
    url: `/daily/get-today-info`,
    method: 'get',
    params: { studentId: id }
  })
}

export function save(data) {
  return request({
    url: `/daily/save`,
    method: 'post',
    data: data
  })
}
