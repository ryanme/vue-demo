<template>

    <div>

        <breadnavigation/>

            <div class="searchField">
                出生日期
                <el-date-picker
                        v-model="birthdayDateRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <span>搜索</span>
                <el-input
                        placeholder="请输入名字搜索"
                        suffix-icon="el-icon-search"
                        v-model="keyword"
                        style="width: 150px; height: 30px">
                </el-input>
            </div>

        <div style="margin-top: 20px; margin-bottom: 20px;">
            <input type="button" value="查询" @click="getUserList()" class="special"/>
            <input type="button" value="新增" @click="router_add()" class="special"/>
<!--            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
<!--            <el-button @click="toggleSelection()">取消选择</el-button>-->
<!--            <input type="button" value="切换第二、第三行的选中状态" @click="toggleSelection([tableData[1], tableData[2]])" class="special"/>-->
            <input type="button" value="取消选择" @click="toggleSelection()" class="special"/>

        </div>

        <el-table :data="userData"
                  ref="multipleTable"
                  stripe
                  style="width: 70%; margin-left: 250px; color: #655e5e"
                  border
                  height="700px"
                  tooltip-effect="dark"
                  @cell-click="onClickUserId"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="tableHeaderColor"
                  :cell-style="nameCellStyle"> <!--当选择项发生变化时会触发该事件-->
            <el-table-column type="selection" width="55"/><!--多选栏-->

            <el-table-column
                    type="index"
                    empty-text="暂无数据"
                    label="序号"
                    :index="indexMethod"
                    width="50">
            </el-table-column><!--自定义索引-->
            <el-table-column prop="user_id" label="ID" width="50"/>
            <el-table-column prop="user_name" label="名字" width="100"/>
            <el-table-column prop="sex" label="性别" width="50"/>
            <el-table-column prop="birthday" label="生日" width="120"/>
            <el-table-column prop="email" label="邮箱" width="100"/>

            <el-table-column label="兴趣爱好" width="150">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>试试tip效果</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.interest || '-'}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="cell_phone" label="电话"  width="120"/>

            <el-table-column label="介绍"  show-overflow-tooltip width="150">
                <template slot-scope="scope">
                    {{ scope.row.introduction || '-'}}
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>


<!--                    <el-popover-->
<!--                            placement="top"-->
<!--                            width="160"-->
<!--                            v-model="visible">-->
<!--                        <p>这是一段内容这是一段内容确定删除吗？</p>-->
<!--                        <div style="text-align: right; margin: 0">-->
<!--                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>-->
<!--                            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>-->
<!--                        </div>-->
                        <el-button slot="reference"
                                   size="mini"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
<!--                    </el-popover>-->


                </template>
            </el-table-column>

        </el-table>
        <div class="block" style="padding-top: 20px">
            <el-pagination
                    background
                    :total="total_size"
                    :current-page.sync="currentPage"
                    :page-sizes="[5, 10, 50, 100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import breadnavigation from "../../Biz/breadnavigation.vue";

    export default {
        name: "UserList",
        data() {
            return {
                userData: [],
                currentPage: 1,
                pagesize: 10,
                multipleSelection: [],
                total_size: null,
                keyword:"",
                birthdayDateRange: null,
                user_url: "",
                param: {}
            }
        },
        methods: {
            getUserList(){
                if(this.keyword){
                     this.user_url = "/sjfapi/usersearch/";
                     this.param = {"params": {"page": this.currentPage, "size": this.pagesize, "params": this.keyword}}
                }else {
                     this.user_url = "/sjfapi/queryuserlist/";
                     this.param = {"params": {"page": this.currentPage, "size": this.pagesize}}
                }

                axios.get(this.user_url, this.param)
                    .then((response) => {
                        if (response.data["code"]===200){
                            this.userData = response.data["data"]["user_list"];
                            this.total_page = response.data["data"]["total_page"];
                            this.total_size = response.data["data"]["total_size"]
                        }else{
                            this.$message.error("查询失败:"+response.data["message"]);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("系统错误，查询失败");
                    });
            },

            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #FCF8E2; color: black; font-weight: 500;'
                }
            },

            //修改列样式
            nameCellStyle({row, column, rowIndex, columnIndex}){
                if (columnIndex===3){
                    return 'text-decoration:underline; color:#808AF8; font-weight:100;'
                }
            },

            onClickUserId(row, column) {
                if("user_name"===column.property){
                    const user_id = row.user_id;
                    this.$router.push({ name: 'UserDetail', params: { userId: user_id } });
                }
            },

            router_add(){
                this.$router.push({ name: 'UserRegister'});
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
                this.getUserList()
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.getUserList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleEdit(index, row) {
                this.$message.warning("修改用户"+row.user_name+"，序号为"+row.user_id);
                // console.log(index, row);
            },
            handleDelete(index, row) {
                // this.$message.warning("删除用户"+row.user_name+"，序号为"+row.user_id);
                axios.post("/sjfapi/userdelete/", {"userdellist": [row.user_id]})
                    .then((response) => {
                        if (response.data["code"]===200){
                            this.$message.success("删除成功");
                            this.getUserList()
                        }else{
                            this.$message.error("删除失败:"+response.data["message"]);
                        }
                    })
                    .catch((error) => {
                        this.$message.error("系统错误，删除失败");
                    });
            },
            indexMethod(index) {
                return index+1;
            }
        },
        mounted() {
            this.getUserList();
        },

        filters: {
            sex_show(value){
                const sex_arrary = {"0": "男", "1": "女"}
                return sex_arrary[value]
            }
        },
        created() {
        },
        components: {
            breadnavigation
        }


    }
</script>

<style scoped>
    table {
        display: table;
        border-collapse: collapse;
        border-spacing: 10px 10px;
        border-color:black;
        text-align: left;
        padding: 10px;
        /*margin-left: 200px;*/
        margin-top: 30px;
        border-style: solid;
    }

    .el-table th>.cell {
        color: darkviolet !important;
    }

    .searchField {
        margin-left: 50px;
        margin-top: 20px;
        padding: 5px;
        float: left;
    }
    .searchField span {
        padding: 10px;
    }

</style>

