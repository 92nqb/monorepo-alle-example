{{!-- handlebars template --}}
import Vue from 'vue';
import App from '{{ appPath }}';

const app = new Vue(App);

app.$mount('#app');
