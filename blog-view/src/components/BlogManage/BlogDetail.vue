<template>

  <div class="content_and_navigation">
      <div v-if="blog_detail" class="blog_detail">
          <div v-html="blog_detail.blog_content"></div>
      </div>
      <globalreturnnavigation/>

  </div>
</template>

<script>
    import axios from 'axios';
    import globalreturnnavigation from '../../Biz/GlobalReturnNavigation';

    const showdown  = require('showdown');
    const converter = new showdown.Converter();

    export default {
        name: "BlogDetail",
        data() {
            return {
                blog_detail: {blog_title: null, blog_content:null},
            }
        },
        methods: {
            get_blog_detail: function () {
                const category_type = this.$route.params["categorytype"];
                const content_id = this.$route.params["id"];
                axios.request({
                    url: '/api/blog/blog_detail',
                    method: 'get',
                    params: {"category_type": category_type, "content_id": content_id}
                })
                    .then((response) => {
                        if (response.data["code"]==="0"){
                            this.blog_detail.blog_title = response.data["data"]["blog_title"];
                            this.blog_detail.blog_content = converter.makeHtml(response.data["data"]["blog_content"]);
                        }else{
                            this.$message.error("出错了"+response.data["data"]);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        mounted() {
            this.get_blog_detail()
        },

        components: {
            globalreturnnavigation
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../statics/markdown-css-themes/markdown9.css";

    .blog_detail {
        margin-top: 0;
        padding: 10px;
        text-align: left;
        background-color: #232121;
        border: 0;
        color: white;
        font-weight: 500;
        font-size: 16px;
        /*display:inline-block;*/
        position:absolute;
        width:60%;

    }

    .content_and_navigation {
        /*margin-left: 500px;*/
        /*float: inherit;*/
        /*position:absolute;*/
        /*display:inline-block;*/
    }


</style>
