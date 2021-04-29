import axios from './axios'
import { H_config } from './config'
import qs from 'qs';

// 登录
export function login(data) {
  return axios({
    method: 'post',
    url: H_config.API_login_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 新增校区
export function addCampus(data) {
  return axios({
    method: 'post',
    url: H_config.API_addCampus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取所有校区
export function getAllCampus(data) {
  return axios({
    url: H_config.API_getAllCampus_URL
  })
}

// 获取所有管理员账号
export function getAllManagerAccount(data) {
  return axios({
    url: H_config.API_getAllManagerAccount_URL
  })
}

// 删除管理员账号
export function addNewManagerAccount(data) {
  return axios({
    method: 'post',
    url: H_config.API_addNewManagerAccount_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 删除管理员账号
export function deleteManagerAccount(data) {
  return axios({
    method: 'post',
    url: H_config.API_deleteManagerAccount_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 修改校区信息
export function updateCampusInfo(data) {
  return axios({
    method: 'put',
    url: H_config.API_updateCampusInfo_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除校区
export function deleteCampus(data) {
  return axios({
    method: 'delete',
    url: H_config.API_deleteCampus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 图片上传
export function updatePhoto(data) {
  return axios({
    method: 'post',
    url: H_config.API_updatePhoto_URL, 
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 多图片上传
export function updatePhotos(data) {
  return axios({
    method: 'post',
    url: H_config.API_updatePhotos_URL, 
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 查询轮播图
export function selectPhotos(data) {
  return axios({
    method: 'post',
    url: H_config.API_selectPhotos_URL, 
    data: data,
  })
}

// 删除图片
export function deletePhoto(data) {
  return axios({
    method: 'post',
    url: H_config.API_deletePhoto_URL, 
    data: data,
  })
}

// 获取所有订单
export function selectAllOrder(data) {
  return axios({
    method: 'post',
    url: H_config.API_selectAllOrder_URL, 
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据订单号查询订单
export function getOrderByOrderNum(data) {
  return axios({
    method: 'post',
    url: H_config.API_getOrderByOrderNum_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取当前抽成比
export function getNewestTakePercentage() {
  return axios({
    method: 'post',
    url: H_config.API_getNewestTakePercentage_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取当前抽成比
export function getNewestTakePercentageByCampus(data) {
  return axios({
    method: 'post',
    data: data,
    url: H_config.API_getNewestTakePercentageByCampus_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 设置抽成比
export function setTakePercentage(data) {
  return axios({
    method: 'post',
    url: H_config.API_setTakePercentage_URL, 
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取抽成修改记录
export function getProfitHistory() {
  return axios({
    method: 'post',
    url: H_config.API_getProfitHistory_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查询一星期内收益
export function getWeeksProfit(data) {
  return axios({
    method: 'post',
    url: H_config.API_getWeeksProfit_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查询一个月内收益
export function getMonthsProfit(data) {
  return axios({
    method: 'post',
    url: H_config.API_getMonthsProfit_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查询一年内收益
export function getYearsProfit(data) {
  return axios({
    method: 'post',
    url: H_config.API_getYearsProfit_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查询某一天收益
export function getDayProfit(data) {
  return axios({
    method: 'post',
    url: H_config.API_getDayProfit_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取校区公告
export function getNotice(data) {
  return axios({
    method: 'post',
    url: H_config.API_getNotice_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 设置校区公告
export function setNotice(data) {
  return axios({
    method: 'post',
    url: H_config.API_setNotice_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 设置入驻提示
export function setTip(data) {
  return axios({
    method: 'post',
    url: H_config.API_setTip_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取入驻提示
export function getTip(data) {
  return axios({
    method: 'post',
    url: H_config.API_getTip_URL,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getAdvice(data) {
  return axios({
    url: H_config.API_getAdvice_URL,
    params: data
  })
}

