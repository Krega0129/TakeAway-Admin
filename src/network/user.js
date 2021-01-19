import axios from './axios'
import { H_config } from './config'

// 查询用户发表历史
export function checkUserHistory(data) {
  return axios({
    method: 'post',
    url: H_config.API_checkUserHistory_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 查出所有校园圈
export function getAllShareSchool(data) {
  return axios({
    url: H_config.API_getAllShareSchool_URL, 
    data: data
  })
}

// 根据审核状态查询校园圈
export function getShareSchoolByStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_getShareSchoolByStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 修改审核状态
export function updateShareSchoolStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_updateShareSchoolStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}