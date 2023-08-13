<template>
    <div class="app-container">
        
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item  >
                <el-input  @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.location" placeholder="位置" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.name" placeholder="名称" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="recordQuery.specification" placeholder="规格" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.category" placeholder="类别" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.grade" placeholder="等级" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="recordQuery.opreation" placeholder="操作类型" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.employName" placeholder="姓名" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.employNumber" placeholder="工号" />
            </el-form-item>
            <el-form-item >
                <el-input @blur="getList()" @keyup.enter.native="getList()"  v-model="recordQuery.basement" placeholder="所属基地" />
            </el-form-item>
            <el-form-item label="操作时间">
                <el-date-picker v-model="recordQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="recordQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
            <el-button type="default" icon="el-icon-delete" @click="resetData()">清空</el-button>

        </el-form>

        <!-- 表格 -->
        <el-table  :data="list"
            ref="multipleTable"  
            fit stripe style="width: 100% " 
            size:mini  border  highlight-current-row >
            <el-table-column fixed label="序号" type="index" width="50px"  align="center" height:atuo >
            </el-table-column>
            <el-table-column prop="location" label="位置" width="auto"  sortable/>
            <el-table-column prop="name" label="名称" width="auto" sortable/>
            <el-table-column prop="opreation" label="操作类型" width="auto" sortable/>
            <el-table-column prop="employName" label="姓名" width="90px" sortable/>
            <el-table-column prop="employNumber" label="工号" width="80px" sortable/>
            <el-table-column prop="specification" label="规格" width=auto sortable>
                <template slot-scope="scope">
                    {{  scope.row.specification+scope.row.unit+'/'+scope.row.packing}}
                </template>
            </el-table-column>                         
            <el-table-column prop="storageNumber" label="数量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.storageNumber+scope.row.packing }}
                </template>
            </el-table-column>
            <!-- <el-table-column :visible="false" prop="packing" label="包装规格"  sortable/> -->
            <el-table-column prop="totalStorage" label="总量"  sortable>
                <template slot-scope="scope">
                    {{  scope.row.totalStorage+scope.row.unit }}
                </template>
            </el-table-column>
            <el-table-column prop="category" label="类别" width=auto sortable/>
            <el-table-column prop="grade" label="等级" width="auto" sortable/>
            <el-table-column prop="brand" label="品牌" width=auto sortable/>
            <!-- <el-table-column :visible="false" prop="unit" label="单位"  sortable/> -->
            <el-table-column prop="batchNumber" label="批号" width=auto sortable/>
            <el-table-column prop="basement" label="所属基地" width=auto sortable/>
            <el-table-column prop="gmtModified" label="操作时间" width="auto"  sortable/>
           
            <!-- <el-table-column fixed="right" label="操作" width="200" align="center"  >
                <template slot-scope="scope">
                    <el-button type="danger" size="small" icon="el-icon-delete"
                        @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getList" />
    </div>
</template>
<script>
import recordApi from '@/api/smq/record'
export default {
    // 写核心代码的位置
    data() {
        // 定义变量和初始值
        return {
            list: null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 15,//每页记录数
            total: 0,//总记录数
            recordQuery: {
            //条件封装对象
            },
        }
    },
    created() {
        // 渲染之前执行，一般调用method定义的方法
        // 调用
        this.getList()
    },
    methods: {
        // 创建具体的方法，调用record.js定义的方法
        getList(page = 1) {
            this.page = page
            recordApi.getRecordListPage(this.page, this.limit, this.recordQuery)
                .then(response => {//请求成功
                    this.list = response.data.rows
                    this.total = response.data.total
                })
        },
        resetData(){
            // 清空表单中条件输入项
            this.recordQuery={}
            // 重新查询数据
            this.getList()
        },
 
    }
}
</script>