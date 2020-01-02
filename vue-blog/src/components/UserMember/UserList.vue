<template>

    <div>

        <breadnavigation/>
        <div style="margin-top: 20px; margin-bottom: 20px">
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
                  @selection-change="handleSelectionChange"> <!--当选择项发生变化时会触发该事件-->
            <el-table-column type="selection" width="55"/><!--多选栏-->

            <el-table-column
                    type="index"
                    :index="indexMethod">
            </el-table-column><!--自定义索引-->
            <el-table-column prop="user_id" label="ID" width="50"/>
            <el-table-column prop="user_name" label="名字" width="100"/>
            <el-table-column prop="sex" label="性别" width="100"/>
            <el-table-column prop="birthday" label="生日" width="100"/>
            <el-table-column prop="email" label="邮箱" width="100"/>
            <el-table-column prop="interest" label="兴趣爱好" width="150"/>
            <el-table-column prop="cell_phone" label="电话" width="120"/>
            <el-table-column prop="introduction" label="介绍" width="150"/>

            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="block" style="padding-top: 20px">
            <el-pagination
                    background
                    :total="100"
                    :current-page.sync="currentPage"
                    :page-sizes="[5, 10, 50, 100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>

<!--        <div v-if="userData">-->
<!--            <table border="1">-->
<!--                <tr>-->
<!--                    <th>ID</th>-->
<!--                    <th>名字</th>-->
<!--                    <th>性别</th>-->
<!--                    <th>生日</th>-->
<!--                    <th>邮箱</th>-->
<!--                    <th>兴趣爱好</th>-->
<!--                    <th>电话</th>-->
<!--                    <th>介绍</th>-->
<!--                </tr>-->

<!--                <tr v-for="user in userData" :key="user.id">-->

<!--                    <td>-->
<!--                        <p>{{ user.user_id }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        <p @click="onClickUserId(user)" class="hrefclass"> {{ user.user_name }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        &lt;!&ndash; <p>{{ user.sex == 0 ? '女士': '先生' }}</p> &ndash;&gt;-->
<!--                        <p>{{ user.sex| sex_show}}</p>-->

<!--                    </td>-->

<!--                    <td>-->
<!--                        <p>{{ user.birthday }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        <p>{{ user.email }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        <p>{{ user.interest }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        <p>{{ user.cell_phone }}</p>-->
<!--                    </td>-->

<!--                    <td>-->
<!--                        <p>{{ user.introduction }}</p>-->
<!--                    </td>-->
<!--                </tr>-->

<!--            </table>-->
<!--        </div>-->

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
                multipleSelection: []
            }
        },
        methods: {
            getUserList(){
                const params = {"page": this.currentPage, "size": this.pagesize}
                axios.get('/sjfapi/queryuserlist/', {params: params})
                    .then((response) => {
                        if (response.data["code"]===200){
                            this.userData = response.data["data"]["user_list"];
                            console.log(this.userData);
                            this.total_page = response.data["data"]["total_page"];
                        }else{
                            this.$message.error("查询失败:"+response.data["message"]);
                            console.error(response.data)
                        }
                    })
                    .catch((error) => {
                        this.$message.error("系统错误，查询失败");
                        console.error(error);
                    });
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
                this.$message.warning("删除用户"+row.user_name+"，序号为"+row.user_id);
                // console.log(index, row);
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
        margin-left: 500px;
        border-style: solid;
    }
    .hrefclass {
        color: lightblue
    }

    input.special {
        height: 30px;
        width: 100px;
        color: white;
        background-color:slateblue;
        text-align: center;
        margin-left: 100px;
        margin-bottom: 10px;
        margin-top: 10px;

    }

    .el-table th>.cell {
        color: darkviolet !important;
    }
</style>
