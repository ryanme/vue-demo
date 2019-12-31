import Vue from 'vue'

export function create_navigation(currentRoute) {
    const parent_path = currentRoute.matched[0].path;
    const parent__title = currentRoute.matched[0].meta.title;

    // const current_path = currentRoute.path;
    const current_title = currentRoute.meta.title;
    var MyComponent = Vue.extend({
        template:'<ul id="breadcrumbs-one">' +
            '<router-link  :to="/">首页</router-link>' +
            '<router-link  :to="{path:\''+parent_path+'\'}"> '+parent__title+'</router-link>' +
            '<a class="current"">'+current_title+'</a>' +
            '</ul>'
    });
    new MyComponent().$mount('#zw');
}
