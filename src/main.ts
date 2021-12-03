import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignInAlt, faCircleNotch, faExclamation, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faSignInAlt, faCircleNotch, faExclamation, faGoogle, faVolumeUp)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
