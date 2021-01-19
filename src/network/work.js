import axios from './axios'
import { H_config } from './config'

// 新增校区
export function addCampus(data) {
  return axios({
    method: 'post',
    url: H_config.API_addCampus_URL, 
    data: data
  })
}

// 获取所有校区
export function getAllCampus(data) {
  return axios({
    url: H_config.API_getAllCampus_URL, 
    data: data
  })
}

// 修改校区信息
export function updateCampusInfo(data) {
  return axios({
    method: 'put',
    url: H_config.API_updateCampusInfo_URL, 
    data: data,
  })
}
