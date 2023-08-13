import request from '@/utils/request'

export default {
    // 1、位置列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，itemQuery查询条件
    getlocationListPage(current,limt,locationQuery){
        return request({
            url: `/smq/locationservice/pageLocationCondition/${current}/${limt}`,
            method: 'post',
            // locationQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: locationQuery
          })
    },
    //删除位置
    deleteLocationId(id){
        return request({
            url: `/smq/locationservice/location/${id}`,
            method: 'delete',
          })
    },
    // 添加位置
    addLocation(location) {
        return request({
            url: `/smq/locationservice/addLocation`,
            method: 'post',
            data: location
        })
    },
    // 根据id查询位置
    getInfo(id){
        return request({
            url: `/smq/locationservice/getLocation/${id}`,
            method: 'get',
        })
    },
    // 修改位置
    updateLocationInfo(location){
        return request({
            url: `/smq/locationservice/updateLocation`,
            method: 'post',
            data: location
        })
    },
}
