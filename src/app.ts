import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api';

import SignupPopup from "./components/SignupPopupComponent.vue";
// @ts-ignore
import VueNotifyPlugin from "./plugins/vue-notify-plugin/src/main";

import "./styles/styles.css";
import 'animate.css/source/_vars.css';
import 'animate.css/source/_base.css';
import 'animate.css/source/fading_entrances/fadeIn.css';
import 'animate.css/source/fading_exits/fadeOut.css';
import 'animate.css/source/fading_entrances/fadeInUp.css';
import 'animate.css/source/fading_entrances/fadeInLeft.css';
import 'animate.css/source/fading_exits/fadeOutDown.css';
import 'animate.css/source/fading_exits/fadeOutRight.css';

Vue.use(VueCompositionAPI);
Vue.use(VueNotifyPlugin);

new Vue({
    el: '#app',
    components: { SignupPopup },
    data: {
        isMenuVisible: false,
        isFetching: false,
        popupVisible: false,
    },
    mounted() {
        console.log(this);
    }
});
