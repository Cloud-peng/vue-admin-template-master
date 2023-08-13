<template>
    <div class="app-container">
        
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="itemQuery.name" placeholder="名称" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="itemQuery.grade" placeholder="等级" />
            </el-form-item>
            
            <!-- <el-form-item>
                <el-select v-model="itemQuery.level" clearable placeholder="讲师头衔">
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item> -->
           
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="itemQuery.category" placeholder="类别" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="itemQuery.storageNumber" placeholder="库存数量" />
            </el-form-item>
            <el-form-item label="修改时间">
                <el-date-picker v-model="itemQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="itemQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
            <el-button type="default" icon="el-icon-delete" @click="resetData()">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table  :data="list"  
        fit stripe style="width: 100% " 
        size:mini  border  highlight-current-row  >
            <el-table-column fixed label="序号" type="index" width="50px"  align="center" height:atuo >
                <!-- <template slot-scope="scope">
                    从1编号到最后一条，不用
                    {{ ((page - 1) * limit + scope.$index + 1) }}
                </template> -->
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
            <el-table-column prop="matter" label="物质状态"  sortable/>
            <el-table-column prop="storageNumber" label="库存数量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.storageNumber+scope.row.packing }}
                </template>
            </el-table-column>
            <el-table-column prop="alertNumber" label="库存预警值"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.alertNumber+scope.row.packing }}
                </template>
            </el-table-column>
            <el-table-column prop="allowStorage" label="最大允许库存"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.allowStorage+scope.row.packing }}
                </template>
            </el-table-column>
            <!-- <el-table-column :visible="false" prop="packing" label="包装规格"  sortable/> -->
            <el-table-column prop="totalStorage" label="库存总量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.totalStorage+scope.row.unit }}
                </template>
            </el-table-column>
            <!-- <el-table-column :visible="false" prop="unit" label="单位"  sortable/> -->
            <el-table-column prop="batchNumber" label="批号" width=auto />
            <el-table-column prop="casNumber" label="CAS号" width=auto />
            <el-table-column prop="gmtModified" label="更新时间" width="160px"  sortable/>
           
            <el-table-column fixed="right" label="操作" width="200" align="center"  >
                <template slot-scope="scope">
                    <router-link :to="'/itemmanager/edit/' + scope.row.id">
                        <el-button type="primary" size="small" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small" icon="el-icon-delete"
                        @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getList" />
    </div>
</template>
<script>
import item from '@/api/smq/item'
export default {
    // 写核心代码的位置
    data() {
        // 定义变量和初始值
        return {
            list: null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 15,//每页记录数
            total: 0,//总记录数
            itemQuery: {
                brand:null
            }//条件封装对象
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
        removeDataById(id){
            this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {//点击确定执行then方法
                item.deleteItemId(id)
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

        }
        
    }
}
</script>