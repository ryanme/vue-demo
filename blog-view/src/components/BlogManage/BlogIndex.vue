<template>
    <div>
            <div  v-if="blog_index_list">
                <div v-for="(blog, index) in blog_index_list" :key="index">
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
           </div>
            <div v-else>
                <el-carc>
                    <p>暂无数据</p>
                </el-carc>
            </div>

    </div>
</template>

<script>

    import RequestUtils from "../../common/RequestUtils";

    export default {
        name: "BlogIndex",
        data() {
            return {
                blog_index_list: []
            }
        },

        mounted() {
            this.user_url = '/api/blog/blog_index';
            const result =new RequestUtils(this.user_url);
            result.get_method()
                .then((response) => {
                    if (response.data["code"] === "0"){
                        this.blog_index_list  = response.data["data"]["blog_list"];
                    }
                    else {
                        this.$message.error("出错了"+response.data["data"]);
                    }
                })
                .catch((error) => {
                    this.$message.error(error)
                });
        },

        methods: {
            router_to_detail: function (content_id, category_type) {
                this.$router.push({ path: '/blog/'+category_type+'/detail/'+content_id});
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


</style>

