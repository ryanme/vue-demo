<template>
    <div id="app">
     <div id="header">
             <router-link to="/"> <img src="blog-logo.png" alt="logo" class="logo"></router-link>

       <div id="menu_1">
          <p>Ryan's Blog</p>
          <ul class="top_menu">
              <li><router-link to="/blog/linux">Linux</router-link></li>
              <li><router-link to="/blog/python">Python</router-link></li>
              <li><router-link to="/blog/django">Django</router-link></li>
              <li><router-link to="/blog/jmeter">Jmeter</router-link></li>
              <li><router-link to="/blog/robotframework">Robotframework</router-link></li>
              <li><router-link to="/blog/tools">Tools</router-link></li>
              <li><router-link to="/blog/test">Test</router-link></li>
          </ul>
       </div>

       <div id="menu_2">
           <searchbar/>
       </div>
    </div>
        
        <div id="body">
            <div id="content">
                <router-view/>
            </div>
        </div>

    </div>
</template>

<script>
    import searchbar from './Biz/SearchBar'
    export default {
        name: 'App',
        data() {
            return {isLogin: false}
        },
        components: {
            searchbar
        }
    }
</script>

<style>
    @import "statics/css/bread.css";
    @import "statics/css/global.css";
    @import "statics/css/blog_list.css";
</style>