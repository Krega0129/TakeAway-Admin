import axios from './axios.js'

export function reviewDetails(data) {
  return axios({
    method: 'post',
    url: '/managerInfo/statusGetShopUpdate', //根据学号或名字
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}
   