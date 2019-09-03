import request from '@/utils/request'

export function getAll() {
  return request({
    url: 'api/Reports/SelAll',
    method: 'get'
  })
}

export function getByShipId(shipId) {
  return request({
    url: 'api/Reports/Sel',
    method: 'get',
    params: { shipId }
  })
}

export function getByFour(str) {
  return request({
    url: 'api/Reports/SelByFour',
    method: 'get',
    params: { str }
  })
}

export function Ins(reports) {
  return request.put('api/Reports/Ins', reports)
}

export function UpdateIsDefault(id) {
  return request({
    url: 'api/Reports/Del',
    method: 'post',
    params: {
      id
    }
  })
}

export function UpdateAll(reports) {
  return request.post('api/Reports/Update', reports)
}
