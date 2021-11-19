import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignInAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faSignInAlt, faCircleNotch)
library.add(faFontAwesome)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
