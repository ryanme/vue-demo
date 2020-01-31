<template>
    <div id="globalreturnnavigation">
       <el-row>
           <el-button size="mini" circle>回列表</el-button>
           <br>
           <el-button size="mini" circle>去首页</el-button>
       </el-row>
    </div>
</template>
<script>
    export default {
        name: "globalreturnnavigation"
    }
</script>
<style scoped>
    #globalreturnnavigation >>> .el-button {
        text-align:center;
        float: unset;
        writing-mode:lr-tb;
        margin:5px auto;
        width:55px;
        line-height:24px;
        border:1px solid #333;
        color: #1F1C1E;
        background: #faa700;
        font-weight: 500;
    }

    #globalreturnnavigation {
        float: right;
        width: 40%;
    }

    /*#globalreturnnavigation button {*/
    /*    margin-left: 0;*/
    /*    float: left;*/
    /*}*/

</style>