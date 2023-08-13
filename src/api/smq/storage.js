import request from '@/utils/request'

export default {
    // 1、库存列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，itemQuery查询条件
    getStorageListPage(current,limt,storageQuery){
        return request({
            url: `/smq/storageservice/pageStorageCondition/${current}/${limt}`,
            method: 'post',
            // storageQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: storageQuery
          })
    },
    //删除库存条目
    deleteStorageId(id){
        return request({
            url: `/smq/storageservice/storage/${id}`,
            method: 'delete',
          })
    },
    // 添加库存条目
    addStorage(storage) {
        return request({
            url: `/smq/storageservice/addStorage`,
            method: 'post',
            data: storage
        })
    },
    // 根据id查询库存条目
    getStorage(id){
        return request({
            url: `/smq/storageservice/getStorage/${id}`,
            method: 'get',
        })
    },
    // 修改库存条目
    updateStorageInfo(storage){
        return request({
            url: `/smq/storageservice/updateStorage`,
            method: 'post',
            data: storage
        })
    },
    // 出入库 storagelist:要出入库的数据列表，falg：出or入库操作的标记，1出库，0入库
    inOroutStorage(storagelist,flag){
       if(flag==0){
        return request({
            url: `/smq/storageservice/inStorage`,
            method: 'post',
            data: storagelist
        })
       }else if(flag==1){
        return request({
            url: `/smq/storageservice/outStorage`,
            method: 'post',
            data: storagelist
        })
       }
    }
}
