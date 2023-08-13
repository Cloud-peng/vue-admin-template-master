import request from '@/utils/request'

export default {
    // 1、库存列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，itemQuery查询条件
    getFavStorageListPage(current,limt,storageQuery){
        return request({
            url: `/smq/myfavorate/storageservice/pageStorageCondition/${current}/${limt}`,
            method: 'post',
            // storageQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: storageQuery
          })
    },
    addToFav(storageVO){
        return request({
            url: `/smq/myfavorate/storageservice/addFavorate`,
            method: 'post',
            // 将storageVO加入到收藏与用户id对应
            // data表示把对象转换为json进行传递到接口里面
            data: storageVO
          })
    },
    removeFav(data){
        return request({
            url: `/smq/myfavorate/storageservice/deleteFavorate`,
            method: 'post',
            // 将storageVO加入到收藏与用户id对应
            // data表示把对象转换为json进行传递到接口里面
            data
          })
    }


}
