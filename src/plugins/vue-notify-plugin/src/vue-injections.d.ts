/**
 * Augment the typings of Vue.js
 */
import Vue from "vue";
import { NotificationMessage, NotificationProps, VueNotifyComponent, VueNotifyComponentMethods } from ".";

declare module "vue/types/vue" {
   interface Vue {
     readonly $notify: (message: string | NotificationMessage, props?: NotificationProps) => void;
     // eslint-disable-next-line @typescript-eslint/ban-types
     $vueNotify?: CombinedVueInstance<Vue, object, VueNotifyComponentMethods, object, Record<never, any>>;
   }
 }
