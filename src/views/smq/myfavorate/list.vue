<template>
    <div class="app-container">
        
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item  >
                <el-input  @blur="getList()" @keyup.enter.native="getList()"  v-model="storageQuery.location" placeholder="位置" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="storageQuery.name" placeholder="名称" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="storageQuery.category" placeholder="类别" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="storageQuery.grade" placeholder="等级" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()"  @keyup.enter.native="getList()" v-model="storageQuery.brand" placeholder="品牌" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="storageQuery.specification" placeholder="规格" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
            <el-button type="default" icon="el-icon-delete" @click="resetData()">清空</el-button>
            <el-button type="primary" icon="el-icon-shopping-cart-full"  @click="outbound">出库</el-button>
            <el-button type="default" icon="el-icon-s-home" @click="inbound">入库</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table  :data="list"
            ref="multipleTable"  
            fit stripe style="width: 100% " 
            size:mini  border  highlight-current-row 
            @selection-change="handleSelectionChange"
            :reserver-selection="true" >
            <el-table-column
                align="center"
                type="selection"
                width="40px">
            </el-table-column>
            <el-table-column fixed label="序号" type="index" width="50px"  align="center" height:atuo >
                <!-- <template slot-scope="scope">
                    从1编号到最后一条，不用
                    {{ ((page - 1) * limit + scope.$index + 1) }}
                </template> -->
            </el-table-column>
            <el-table-column prop="location" label="位置" width="200px"  sortable/>
            <el-table-column prop="name" label="名称" width="200px" sortable/>
            <el-table-column prop="category" label="类别" width=auto sortable/>
            <el-table-column prop="grade" label="等级" width="160px" sortable/>
            <el-table-column prop="brand" label="品牌" width=auto sortable/>
            <el-table-column prop="specification" label="规格" width=auto sortable>
                <template slot-scope="scope">
                    {{  scope.row.specification+scope.row.unit+'/'+scope.row.packing}}
                </template>
            </el-table-column>                         
            <el-table-column prop="storageNumber" label="存放数量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.storageNumber+scope.row.packing }}
                </template>
            </el-table-column>
            <!-- <el-table-column :visible="false" prop="packing" label="包装规格"  sortable/> -->
            <el-table-column prop="totalStorage" label="存放总量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.totalStorage+scope.row.unit }}
                </template>
            </el-table-column>
            <!-- <el-table-column :visible="false" prop="unit" label="单位"  sortable/> -->
            <el-table-column prop="batchNumber" label="批号" width=auto sortable/>
            <el-table-column prop="basement" label="所属基地" width=auto sortable/>
            <el-table-column prop="gmtModified" label="更新时间" width="160px"  sortable/>
           
            <el-table-column fixed="right" label="操作" width="200" align="center"  >
                <template slot-scope="scope">
                    <el-button type="danger" size="small" icon="el-icon-delete"
                        @click="removeFav(scope.row)">取消收藏</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getList" />
        
        <!-- 弹窗出入库表单 -->
        <el-dialog :title="outorinboundOpration==1?'出库':'入库'" :visible.sync="dialogInOutFormVisible"  label-width="auto">
            <OutAndInboundVue :list="multipleSelection" :flag="outorinboundOpration"   @changedialogInOutFormVisible="changedialogInOutFormVisible" ></OutAndInboundVue>
        </el-dialog>
    </div>
</template>
<script>
import storageApi from '@/api/smq/storage'
import myfavstorApi from'@/api/smq/myfavorate'
import Vue from 'vue';
Vue.component('OutAndInboundVue', () => import('@/views/smq/storage/outandinbound.vue'))
export default {
    // 写核心代码的位置
    data() {
        // 定义变量和初始值
        return {
            list: null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 15,//每页记录数
            total: 0,//总记录数
            storageQuery: {
            //条件封装对象
            },
            // 多选数组
            multipleSelection: [],
            // 弹出式出入库列表显示状态
            dialogInOutFormVisible: false,
            // 操作类型，出库还是入库，1出库，0入库
            outorinboundOpration:'1'
        }
    },
    created() {
        // 渲染之前执行，一般调用method定义的方法
        // 调用
        this.getList()
    },
    methods: {
        // 创建具体的方法，调用storage.js定义的方法
        getList(page = 1) {
            this.page = page
            myfavstorApi.getFavStorageListPage(this.page, this.limit, this.storageQuery)
                .then(response => {//请求成功
                    this.list = response.data.rows
                    this.total = response.data.total
                })
        },
        resetData(){
            // 清空表单中条件输入项
            this.storageQuery={}
            // 重新查询数据
            this.getList()
        },
        removeDataById(id){
            this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定执行then方法
                storageApi.deleteStorageId(id)
                    .then(response => {//删除成功
                        this.$message({
                            // 提示信息
                            type: 'success',
                            message: '删除成功!'
                        })
                        // 回到列表页面
                        this.getList()
                    })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 处理多选事件
        handleSelectionChange(val,row) {
            // 每次调用前清空multipleSelection数组
        this.multipleSelection=[] 
        //   当选中数量大于limit时，限制选中数量并弹出提示
        if(val.length>this.limit){
            val.slice(0,this.limit).forEach(row => {
            if(this.multipleSelection.indexOf(row) == -1 &&this.multipleSelection.length < this.limit){
                this.multipleSelection.push(row)
                
            }})
            // 处理多余的选中项目
            let tempArr=val.slice(this.limit);
            if(tempArr.length!=0){
                // 取消多余项目的选中框
                tempArr.forEach(ele=>{
                    this.$refs['multipleTable'].toggleRowSelection(ele,false)
                })     
            } 
            // 弹出提示信息
            this.$message({
                        type: 'warning',
                        message: '最多只能选中'+this.limit+'条'
            })
             
        }
        else {//   当选中数量不大于limit时
            val.forEach(row => {
            if(this.multipleSelection.indexOf(row) == -1 &&this.multipleSelection.length < this.limit){
                this.multipleSelection.push(row)
            }})

        }
      },
    //   处理出库操作
      outbound(){
        this.dialogInOutFormVisible=!this.dialogInOutFormVisible
        this.outorinboundOpration='1'
      },
      //   处理入库操作
      inbound(){
        this.dialogInOutFormVisible=!this.dialogInOutFormVisible
        this.outorinboundOpration='0'
      },
      changedialogInOutFormVisible(){
        this.dialogInOutFormVisible=! this.dialogInOutFormVisible
        return this.getList()
      },
      removeFav(data){
        myfavstorApi.removeFav(data).then(response => {//删除成功
                        this.$message({
                            // 提示信息
                            type: 'success',
                            message: '取消收藏成功!'
                        })
                        // 回到列表页面
                        this.getList()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消收藏失败'
                });
            }); 
        return this.getList()
      } 
    }
}
</script>