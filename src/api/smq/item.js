import request from '@/utils/request'

export default {
    // 1、类目列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，itemQuery查询条件
    getItemListPage(current,limt,itemQuery){
        return request({
            url: `/smq/itemservice/pageItemCondition/${current}/${limt}`,
            method: 'post',
            // itemQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: itemQuery
          })
    },
    //删除类目
    deleteItemId(id){
        return request({
            url: `/smq/itemservice/item/${id}`,
            method: 'delete',
          })
    },
    // 添加类目
    addItem(item) {
        return request({
            url: `/smq/itemservice/addItem`,
            method: 'post',
            data: item
        })
    },
    // 根据id查询类目
    getInfo(id){
        return request({
            url: `/smq/itemservice/getItem/${id}`,
            method: 'get',
        })
    },
    // 修改类目
    updateItemInfo(item){
        return request({
            url: `/smq/itemservice/updateItem`,
            method: 'post',
            data: item
        })
    },
}
