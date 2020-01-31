<template>
            <div class="searchbar">
                <form>
                    <input type="text" placeholder="搜索" name="crid">
                    <button type="button"/>
                </form>
            </div>
</template>
<script>
    export default {
        name: "searchbar"
    }
</script>
<style scoped>
    .searchbar form {
        padding: 12px;
        height: 42px;
        position: relative;
        width: 250px;
        margin: 0 auto;
        box-sizing: border-box;

    }

    .searchbar input {
        width: 200px;
        border-radius: 42px;
        /*border: 2px solid #324B4E;*/
        background: #F9F0DA;
        transition: .3s linear;
        float: right;
        height: 42px;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .searchbar button {
        border: none;
        color: saddlebrown;
        background: none;
        right: 20px;
        height: 42px;
        width: 42px;
        cursor: pointer;
        position: absolute;
        box-sizing: border-box;
    }


    .searchbar button:before {
        border: none;
        content: "Search";
        font-family: FontAwesome;
        color: #324b4e;
    }

</style>