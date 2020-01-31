<template>
    <div>
        <div  v-if="should_show">
            <div v-for="(blog, index) in blog_list" :key="index">
                <el-card class="blog_list">

                       <span class="blog_title first_head">
                           <p @click="router_to_detail(blog.id, blog.type)" class="router_a">{{blog.title}}</p>
                       </span>

                    <span  class="otherinfo first_head">
                            <p>【分类】：{{blog.type}}</p>
                            <p>【访问】：{{blog.visit}}</p>
                        </span>

                    <span class="blog_shortcontent">
                            <p>{{blog.shortcontent}}</p>
                        </span>

                </el-card>
            </div>

            <div class="block" style="padding-top: 20px">
                <el-pagination
                        id="haishiwode"
                        background
                        :total="total_nums"
                        :current-page.sync="currentPage"
                        :page-sizes="[5, 10, 50, 100]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                </el-pagination>
            </div>

        </div>
        <div v-else>
            <p>暂无数据</p>
        </div>
    </div>
</template>

<script>

    import RequestUtils from "../../common/RequestUtils";

    export default {
        name: "CategoryTypeList",
        data() {

            return {
                should_show: false,
                blog_list: [],
                total_nums: 0,
                currentPage: 1,
                pagesize: 10,
            }
        },
        mounted() {
            this.get_blog_list()
        },

        watch: {
            '$route':'get_blog_list'
        },

        methods: {
            get_blog_list: function(){
                let category_type = this.$route.params.categorytype;
                this.user_url = '/api/blog/blog_list';
                const result =new RequestUtils(this.user_url,
                    {
                            "category_type": category_type,
                            "page": this.currentPage,
                            "size": this.pagesize
                            });
                result.get_method()
                    .then((response) => {
                        if (response.data["code"] === "0"){
                            if (response.data["data"]["blog_list"].length>0) {
                                this.blog_list = response.data["data"]["blog_list"];
                                this.total_nums = response.data["data"]["total_nums"];
                                this.should_show = true;
                            }else  this.should_show = false;
                        }
                        else {
                            this.should_show = false;
                            this.$message.error("出错了: "+response.data["data"]);
                        }
                    })
                    .catch((error) => {
                        this.$message.error(error)
                    });
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
                this.get_blog_list()
            },

            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.get_blog_list()
            },

            router_to_detail: function (content_id, category_type) {
                this.$router.push({ path:'/blog/'+category_type+'/detail/'+content_id});
            }
        }
    }
</script>

<style scoped>
    .blog_list {
        border-radius: 42px;
        height: 100px;
        padding: 5px;
        margin: 30px 0;
        width: 85%;
        text-align: left;
        background-color: #232121;
        color: white;
    }
    .blog_title {
        font-size: medium;
        font-weight: 600;
    }

    .otherinfo p{
        font-weight: 600;
        font-size: small;
        float: right;
        margin: 0;
        display: inline-block;
        height: 26px;
        color: #D8ADAD;
        width: 15%;
        text-align: right;
    }

    .first_head p{
        display: inline-block;
    }

    .otherinfo p{
        display:block;
    }


    .blog_shortcontent {
        color: #ffebc6;
        margin-top: 5px;
        line-height: 26px;
        font-size: small;
    }

    /*屏幕大于1000像素则执行下面css代码。*/
    @media screen and (max-width:1090px){
        .otherinfo p{
            display:none;
        }
    }

    /* 分页组件样式 */
    #haishiwode >>> input, #haishiwode >>> button, #haishiwode >>>li{
        background: #232121;
    }

    #haishiwode >>> .el-select-dropdown__wrap {
        background: #232121 !important;
    }

</style>

