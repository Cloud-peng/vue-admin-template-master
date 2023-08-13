<template>
    <div class="app-container">
        <el-form label-width="auto" :rules="rules"  size="middle" :model="item" ref="item">

            <el-row :gutter="20" class="row-bg" >
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="类目名称"  
                        prop="name"
                        >
                            <el-input v-model="item.name" />
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="类别" >
                            <el-select v-model="item.category" clearable filterable allow-create default-first-option
                                placeholder="请选择">
                                <!--
                            数据类型一定要和取出的json中的一致，否则没法回填
                            因此，这里value使用动态绑定的值，保证其数据类型是number
                            -->
                                <el-option :value="'其他类'" label="其他类" />
                                <el-option :value="'易制爆类'" label="易制爆类" />
                                <el-option :value="'易制毒类'" label="易制毒类" />
                                <el-option :value="'重点监管类'" label="重点监管类" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="等级">
                            <el-select v-model="item.grade" clearable filterable allow-create default-first-option
                                placeholder="请选择">
                                <!--
                            数据类型一定要和取出的json中的一致，否则没法回填
                            因此，这里value使用动态绑定的值，保证其数据类型是number
                            -->
                                <el-option :value="'化学纯'" label="化学纯" />
                                <el-option :value="'分析纯'" label="分析纯" />
                                <el-option :value="'优级纯'" label="优级纯" />
                                <el-option :value="'光谱纯'" label="光谱纯" />
                                <el-option :value="'色谱纯'" label="色谱纯" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="品牌"  
                        prop="brand"
                        >
                            <el-input v-model="item.brand" />
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="row-bg">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item 
                        label="规格" 
                        prop="specification"                      
                        >
                            <el-input v-model.number="item.specification"  >
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-form-item label="单位">
                            <el-select v-model="item.unit" clearable filterable allow-create default-first-option
                                placeholder="单位">
                                <!--
                            数据类型一定要和取出的json中的一致，否则没法回填
                            因此，这里value使用动态绑定的值，保证其数据类型是number
                            -->
                                <el-option :value="'mL'" label="mL" />
                                <el-option :value="'L'" label="L" />
                                <el-option :value="'mg'" label="mg" />
                                <el-option :value="'g'" label="g" />
                                <el-option :value="'kg'" label="kg" />
                                <el-option :value="'gal'" label="gal" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-form-item label="包装方式">
                            <el-select v-model="item.packing" clearable filterable allow-create default-first-option
                                placeholder="包装方式">
                                <!--
                            数据类型一定要和取出的json中的一致，否则没法回填
                            因此，这里value使用动态绑定的值，保证其数据类型是number
                            -->
                                <el-option :value="'瓶'" label="瓶"  />
                                <el-option :value="'盒'" label="盒" />
                                <el-option :value="'包'" label="包" />
                                <el-option :value="'袋'" label="袋" />
                                <el-option :value="'箱'" label="箱" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple"> 
                        <el-form-item label="批号" >
                            <el-input v-model="item.batchNumber" />
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple"> 
                        <el-form-item label="CAS号" >
                            <el-input v-model="item.casNumber" />
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
            
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="库存数量" 
                        prop="storageNumber"
                        >
                            <el-input v-model.number="item.storageNumber" :disabled="!this.item.id" >
                                <template slot="append">{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="库存预警值"  
                        prop="alertNumber">
                            <el-input v-model.number="item.alertNumber"  >
                                <template slot="append" >{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="最大允许库存" 
                        prop="allowStorage">
                            <el-input v-model.number="item.allowStorage" >
                                <template slot="append">{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="200" class="row-bg">
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-form-item label="库存总量"  
                        prop="totalStorage">
                            <el-input   v-model="item.totalStorage"  :disabled="!this.item.id">
                                <template slot="append">{{ item.unit }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-form-item label="物质状态">
                            <el-select v-model="item.matter" clearable filterable allow-create default-first-option
                                placeholder="物质状态">
                                <!--
                            数据类型一定要和取出的json中的一致，否则没法回填
                            因此，这里value使用动态绑定的值，保证其数据类型是number
                            -->
                                <el-option :value="'固体'" label="固体"  />
                                <el-option :value="'液体'" label="液体" />
                                <el-option :value="'气体'" label="气体" />
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
               
            </el-row>
            
            <el-form-item  >
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate" >保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
import itemAPI from '@/api/smq/item'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
// import item from '../../../api/smq/item';
export default {
    components: { ImageCropper, PanThumb },
    data() {
        //验证数值(非负值，最多两位小数)
        const validateValidity = (rule, value, callback) => {
            if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
                callback(new Error('请输入非负数,最多能输入两位小数'));
            } else {
                callback();
            }
        };
        //验证数值(非负整数)
        const checkMinVal = (rule, value, callback) => {
            if (!/(^[0-9]\d*$)/.test(value)) {
                callback(new Error('请输入非负整数'));
            } else {
                callback();
            }
        };
        return {
            item: {
                id:'',
                name: '',
                category: '',
                grade: '',
                brand: '',
                specification: '0',
                unit: '',
                packing: '',
                batchNumber: '',
                casNumber: '',
                matter: '',
                storageNumber: 0,
                totalStorage: 0.0000,
                alertNumber: 1,
                allowStorage: 10,
            },
            rules:{
                name:[
                    { required: true, message: '类目名称不能为空'}
                ],
                specification: [
                { required: true, message: '规格不能为空' },
                { validator: checkMinVal, trigger: 'blur'}
                ],
                storageNumber:[
                    { required: true, message: '库存数量不能为空'},
                    { validator: checkMinVal, trigger: 'blur'}
                ],
                alertNumber:[
                    { validator: checkMinVal, trigger: 'blur'}
                ],
                allowStorage:[
                    { validator: checkMinVal, trigger: 'blur'}  
                    
                ],
                totalStorage:[
                    { required: true, message: '库存总量不能为空'},
                    { validator: validateValidity, trigger: 'blur'}                  
                ],

            },
            // 
            // 上传弹框组件是否显示
            imagecropperShow: false,
            imagecropperKey: 0,//上传组件key值
            BASE_API: process.env.VUE_APP_BASE_API,//获取dev.env.js里面的地址
            saveBtnDisabled: false//保存按钮是否禁用
        };
    },
    created() {//页面渲染前执行
        this.init()
    },
    watch: {//监听
       
        $route(to, from) {//路由变换方式，路由发生变化，就会执行
            this.init()
        }
    },
    methods: {
        close() {//关闭上传弹框的方法
            this.imagecropperShow = false
            // 上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },
        // 上传成功的方法
        cropSuccess(data) {
            this.imagecropperShow = false
            // 上传成功之后接口返回图片地址
            this.teacher.avatar = data.url

        },
        init() {
            // 判断路径是否有id值
            if (this.$route.params && this.$route.params.id) {
                // 从路径获取id值
                const id = this.$route.params.id
                this.getItemInfo(id)
            } else {
                // 清空表单
                this.item = {
                id:'',
                name: '',
                category: '',
                grade: '',
                brand: '',
                specification: 0,
                unit: '',
                packing: '',
                batchNumber: '',
                casNumber: '',
                matter: '',
                storageNumber: 0,
                totalStorage: 0.0000,
                alertNumber: 1,
                allowStorage: 1,}
            }
        },
        // 根据类目id查询的方法
        getItemInfo(id) {
            itemAPI.getInfo(id)
                .then(response => {
                    this.item = response.data.item
                })
        },
        saveOrUpdate() {
            // 判断是修改还是添加
            // 根据teacher是否有id
            if (!this.item.id) {
                this.saveItem()
            } else {
                this.updatedItem()
            }
        },
        // 修改类目的方法
        updatedItem() {
            itemAPI.updateItemInfo(this.item)
                .then(response => {
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    // 回到列表页面  路由跳转
                    this.$router.push({ path: '/itemmanager/list' })
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })
        },
        // 添加讲师的方法
        saveItem() {
            itemAPI.addItem(this.item)
                .then(response => {//添加成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    // 回到列表页面  路由跳转
                    this.$router.push({ path: '/itemmanager/list' })
                }).catch(response => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })
        }

    },
}
</script>
<style>
.el-row {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 6px;
    min-height: 36px;
    
}

.row-bg {
    padding: 20px 0;
    background-color: #f9fafc;
}
.el-form-item__label-wrap {
  margin-left: 0px !important;
 
}
</style>