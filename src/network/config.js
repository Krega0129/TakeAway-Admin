// const BASE_URL = 'https://www.lizeqiang.top:8888'
// const BASE_URL = 'https://192.168.1.102:8080'
// const BASE_URL = 'https://localhost:8080'
const BASE_URL = 'https://www.sijie666.com:8080'

const H_config = {}

// 平台
H_config.STATECODE_campus_SUCCESS = 3200
H_config.API_addCampus_URL = '/campus/insert'
H_config.STATECODE_addCampus_FAILED = 1510

H_config.API_getAllCampus_URL = '/campus/selectAll'
H_config.STATECODE_getAllCampus_FAILED = 2513

H_config.API_updateCampusInfo_URL = '/campus/update'
H_config.STATECODE_updateCampusInfo_FAILED = 1506

H_config.API_deleteCampus_URL = '/campus/delete'

H_config.API_updatePhoto_URL = '/managerInfo/updatePhoto'
H_config.API_updatePhotos_URL = '/managerInfo/updatePhotos'
H_config.STATECODE_updatePhoto_SUCCESS = 1205
H_config.STATECODE_deletePhoto_SUCCESS = 1203
H_config.STATECODE_updatePhoto_NULL_FAILED = 1516   // 文件为空
H_config.STATECODE_updatePhoto_TYPE_FAILED = 1517   // 文件类型错误
H_config.STATECODE_updatePhoto_FAILED = 1518        // 文件上传失败

H_config.API_selectPhotos_URL = '/managerInfo/selectPhotos'
H_config.API_deletePhoto_URL = '/managerInfo/deletePhoto'
H_config.STATECODE_selectPhotos_NULL_FAILED = 1500   // 参数为空（删除图片适用）
// 根据订单编号查询订单
H_config.API_getOrderByOrderNum_URL = '/order/selectAllOrderInfo'
H_config.STATECODE_getOrderByOrderNum_SUCCESS = 3208
H_config.STATECODE_getOrderByOrderNum_FAILED = 3555
// 获取当前抽成比
H_config.API_getNewestTakePercentage_URL = '/profit/selectNewest'
H_config.API_getNewestTakePercentageByCampus_URL = '/profit/selectNewestByCampusName'
// 设置抽成比
H_config.API_setTakePercentage_URL = '/profit/insert'
H_config.STATECODE_takePercentage_SUCCESS = 3200
// 获取抽成修改记录
H_config.API_getProfitHistory_URL = '/profit/selectAll'
// 获取校区公告
H_config.API_getNotice_URL = '/manager/getNotice'
// 设置校区公告
H_config.API_setNotice_URL = '/manager/setNotice'
// 获取提示
H_config.API_getTip_URL = '/manager/getTip'
// 设置提示
H_config.API_setTip_URL = '/manager/setTip'
// 获取投诉列表
H_config.API_getAdvice_URL = '/manager/getAdvise'
// 获取所有外卖订单
H_config.API_selectAllOrder_URL = '/order/selectAllOrder'
// 根据骑手id查询订单列表
H_config.API_selectRiderOrderInfoByDate_URL = '/order/selectRiderOrderInfoByDate'
// 获取快递订单
H_config.API_listAllOrder_URL = '/expressAgent/listAllOrder'
// 根据订单编号获取快递订单信息
H_config.API_selectOrderByOrderNumber_URL = '/expressAgent/selectOrderByOrderNumber'

// 店铺
H_config.STATECODE_get_SUCCESS = 1200 // 查询成功
H_config.STATECODE_getNull_FAILED = 1201  // 查询结果为空
H_config.STATECODE_update_SUCCESS = 1202  // 修改成功
H_config.STATECODE_getShopInfo_FAILED = 1503    // 店铺信息结果为空（除店铺商品）
// 审核店铺修改信息
H_config.API_auditShopUpdate_URL = '/managerInfo/auditShopUpdate'
H_config.STATECODE_review_SUCCESS = 1207
// 获取店铺修改详情
H_config.API_statusGetShopUpdate_URL = '/managerInfo/statusGetShopUpdate'
// 审核新店
H_config.API_reviewNewShop_URL = '/managerInfo/updateAuditStatus'
// 店铺列表展示
H_config.API_getShop_URL = '/managerInfo/selectShops'
// 查询店铺商品信息
H_config.API_shopIdGetCommodity_URL = '/managerInfo/selectShopCommodity'
// 店铺详细信息
H_config.API_shopIdGetShop_URL = '/managerInfo/selectShopInfo'
// 店铺证书
H_config.API_shopIdGetShopLicense_URL = '/managerInfo/selectShopLicense'
// 修改店铺营业状态
H_config.API_updateAllRunStatus_URL = '/managerInfo/updateAllRunStatus'
// 修改店铺置顶
H_config.API_updateTopStatus_URL = '/managerInfo/updateTopStatus'

// 查询一星期内收入
H_config.API_getWeeksProfit_URL = '/data/selectPlatformProfitInWeek'
H_config.STATECODE_getProfit_SUCCESS = 3207
// 查询一月内收入
H_config.API_getMonthsProfit_URL = '/data/selectNearMonthProfit'
// 查询一年内收入
H_config.API_getYearsProfit_URL = '/data/selectMonthlyProfit'
// 查询某一天收入
H_config.API_getDayProfit_URL = '/data/selectCenterProfitByDay'

// 骑手
H_config.STATECODE_rider_SUCCESS = 3200
H_config.API_getAllRider_URL = '/driverinfo/selectAll'
H_config.API_getRiderInfo_URL = '/driverinfo/selectById'
H_config.API_getRiderByStatus_URL = '/driverinfo/selectByStatus'  // 没有成功状态码
H_config.API_updateRiderInfo_URL = '/driverinfo/update'
H_config.API_updateReviewStatus_URL = '/driverinfo/updateStatus'
H_config.API_selectById_URL = '/driverprove/selectById'
H_config.API_deleteRiderInfo_URL = '/driverinfo/delete'

// 分享校园
H_config.API_checkUserHistory_URL = '/shareschool/selectByUid'
H_config.STATECODE_checkUserHistory_SUCCESS = 2217
H_config.API_getAllShareSchool_URL = '/shareschool/selectAll'
H_config.STATECODE_getAllShareSchool_SUCCESS = 2222
H_config.API_getShareSchoolByStatus_URL = '/shareschool/selective'
H_config.STATECODE_getShareSchoolByStatus_SUCCESS = 3200
H_config.API_updateShareSchoolStatus_URL = '/shareschool/updateStatus'
H_config.STATECODE_updateShareSchoolStatus_SUCCESS = 2220

H_config.API_getExpressSpec_URL = '/expressAgent/selectExpressAgentPrice'
H_config.STATECODE_express_SUCCESS = 3200
H_config.API_deleteSpec_URL = '/expressAgent/deletePriceById'

H_config.API_setExpressSpec_URL = '/expressAgent/addNewExpressAgentPrice'
H_config.STATECODE_setExpressSpec_SUCCESS = 3200


// 登录
H_config.API_login_URL = '/manager/login'
H_config.STATECODE_SUCCESS = 3200

H_config.API_getAllManagerAccount_URL = '/manager/getAccount'

H_config.API_deleteManagerAccount_URL = '/manager/delAccount'

H_config.API_addNewManagerAccount_URL = '/manager/setAccount'

export {
  BASE_URL,
  H_config
}