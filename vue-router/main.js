import Vue from 'vue';
import Router from './Router'; 
// NumberBaseball.vue에서 export 안에 있는걸 불러오는 것
// node에서는 require module.export 
new Vue(Router).$mount('#root'); // 뷰 인스턴스