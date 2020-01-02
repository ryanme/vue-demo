import Vue from 'vue'

export function create_navigation(currentRoute) {
    const parent_path = currentRoute.matched[0].path;
    const parent_title = currentRoute.matched[0].meta.title;

    const current_title = currentRoute.meta.title;
    const tmp = `<ul id="breadcrumbs-one">
<router-link to="/">首页</router-link>
<router-link :to="{path:'${parent_path}'}">${parent_title}</router-link>
<a class="current">${current_title}</a></ul>`;

    var MyComponent = Vue.extend({
        template: tmp,
        components: {
            RouterLink
        }
    });
    // var MyComponent = Vue.extend({
    //     template:'<ul id="breadcrumbs-one">' +
    //         '<router-link  to="/">首页</router-link>' +
    //         '<router-link  to="{path: "/managemember" }">用户管理</router-link>' +
    //         '<a class="current">用户列表</a>' +
    //         '</ul>'
    // });
    new MyComponent().$mount('#zw');
}
