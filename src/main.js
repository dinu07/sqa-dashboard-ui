import Vue from 'vue'
import VueApollo from 'vue-apollo'

// import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
// // Import the styles directly. (Or you could add them via script tags.)
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
// Import data tables css
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'bootstrap/dist/js/bootstrap.bundle'

import App from './App.vue'
import {apolloProvider} from './graphql/apollo';
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import VueCarousel from 'vue-carousel';


Vue.config.productionTip = false

Chart.plugins.unregister(ChartDataLabels);
// Install the Vue plugin
Vue.use(VueApollo)
// Install the bootstrap plugin
// Vue.use(BootstrapVue)
// install datatables plugin
// Vue.use(VuejsDatatableFactory)

// install carousel
Vue.use(VueCarousel)

new Vue({
  render: h => h(App),
  apolloProvider
}).$mount('#app')
