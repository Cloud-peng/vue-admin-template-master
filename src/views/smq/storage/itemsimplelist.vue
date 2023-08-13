<template>   
    <div class="app-container">      
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline" title="选择类目">
            <el-form-item >
                <el-input @blur="getList()"  v-model="itemQuery.name" placeholder="名称" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()"  v-model="itemQuery.grade" placeholder="等级" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()"  v-model="itemQuery.category" placeholder="类别" />
            </el-form-item>
            <!-- <el-form-item >
                <el-input @blur="getList()"  v-model="itemQuery.storageNumber" placeholder="库存数量" />
            </el-form-item> -->
            <!-- <el-form-item label="修改时间">
                <el-date-picker v-model="itemQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="itemQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item> -->
            <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
            <el-button type="default" icon="el-icon-delete" @click="resetData()">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table  :data="list"  
        fit stripe style="width: 100% " 
        ref="selectTable"
        @selection-change="handleSelectionChange"
        @select="select"
        size:mini  border  highlight-current-row  >
            <el-table-column align="center" type="selection" width="40px" ></el-table-column>
            <el-table-column fixed label="序号" type="index" width="50px"  align="center" height:atuo >
            </el-table-column>
            <el-table-column prop="name" label="名称" width=auto  sortable/>
            <el-table-column prop="category" label="类别" width=auto sortable/>
            <el-table-column prop="grade" label="等级" width=auto sortable/>
            <el-table-column prop="brand" label="品牌" width=auto sortable/>
            <el-table-column prop="specification" label="规格" width=auto sortable>
                <template slot-scope="scope">
                    {{  scope.row.specification+scope.row.unit+'/'+scope.row.packing}}
                </template>
            </el-table-column>                         
            <el-table-column prop="storageNumber" label="库存数量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.storageNumber+scope.row.packing }}
                </template>
            </el-table-column>
            <el-table-column prop="batchNumber" label="批号" width=auto />
            <el-table-column prop="gmtModified" label="更新时间" width="120px"  sortable/>
           
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getList" />
    </div>  
</template>

<script>


import item from '@/api/smq/item'
export default {
    props: {
        dialogTableVisible:{
            type: Boolean,
            default: false
        }
    },
    // 写核心代码的位置
    data() {
        // 定义变量和初始值
        return {
            list: null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 10,//每页记录数
            total: 0,//总记录数
            itemQuery: {
                brand:null
            },//条件封装对象
            // 选中行条目对象
            selectrowItem:{}
        }
    },
    created() {
        // 渲染之前执行，一般调用method定义的方法
        // 调用
        this.getList()
    },
    methods: {
        // 创建具体的方法，调用item.js定义的方法
        getList(page = 1) {
            this.page = page
            item.getItemListPage(this.page, this.limit, this.itemQuery)
                .then(response => {//请求成功
                    // response接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                })
                .catch(error => {
                    console.error()
                })
        },
        resetData(){
            // 清空表单中条件输入项
            this.itemQuery={}
            // 重新查询数据
            this.getList()
        },
          // 处理单选事件
      select(selection, row) {
            if (selection.length > 1) {
                const del_row = selection.shift();
                this.$refs.selectTable.toggleRowSelection(del_row, false);
            }
            this.selectrowItem=row
            // 
            this.$emit('changedialogItemTableVisible')
            this.$emit('changeSelectItem',this.selectrowItem)
        },
      // 处理多选事件
      handleSelectionChange(val) {
        //   当选中数量大于1时，限制选中数量并弹出提示
        if(val.length>1){
            // 处理多余的选中项目
            let tempArr=val;
            if(tempArr.length!=0){
                // 取消多余项目的选中框
                tempArr.forEach(ele=>{
                    this.$refs.selectTable.toggleRowSelection(ele,false)
                })     
            } 
           // 弹出提示信息
        this.$message({
                        type: 'warning',
                        message: '最多只能选中1条'
                    })        
        }
      },
        
    }
}
</script>