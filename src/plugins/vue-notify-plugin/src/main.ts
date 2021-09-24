import Vue, {PluginObject} from "vue";

import VueNotifyComponent from "@plugin/components/VueNotifyComponent.vue";
import * as Enums from "@plugin/enums";
import Toast from "@plugin/classes/Toast";

import { NotificationMessage, NotificationProps, VueNotifyComponentMethods, VueNotifyPluginOptions } from ".";

const vueNotifyPlugin: PluginObject<VueNotifyPluginOptions> = {
    install(VC, options) {
        const vc = VC;
        const notificationProps: NotificationProps = {
            type: Enums.NotificationType.TOAST,
            position: Enums.Position.RIGHT_BOTTOM
        }

        const forbiddenToastPositions: Enums.Position[] = [
            Enums.Position.LEFT_MIDDLE,
            Enums.Position.CENTER_MIDDLE,
            Enums.Position.RIGHT_MIDDLE,
        ];

        function notify(this: Vue, message: string | NotificationMessage, props?: NotificationProps){

            Object.assign(notificationProps, {...props});

            if(notificationProps.type === Enums.NotificationType.TOAST &&
               notificationProps.position &&
               forbiddenToastPositions.indexOf(notificationProps.position) >= 0)
            {
                console.warn(`Toast with position ${notificationProps.position} could not be invoked`);
                return;
            }

            let notificationMessage: NotificationMessage;
            if(typeof message === "string") {
                notificationMessage = {
                    text: message
                }
            } else {
                notificationMessage = message;
            }

            const {$root} = this;

            if(!$root.$vueNotify){
                const container = document.createElement("div");
                document.body.appendChild(container);
                // eslint-disable-next-line @typescript-eslint/ban-types
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                $root.$vueNotify = new VueNotifyComponent({
                    propsData: notificationProps,
                    destroyed(){
                        if($root.$vueNotify){
                            document.body.removeChild($root.$vueNotify.$el);
                        }

                        delete $root.$vueNotify;
                    }
                }).$mount(container);
            }

            const newToast = new Toast(notificationMessage);

            $root.$vueNotify?.addToast(newToast, notificationProps.position ?? Enums.Position.RIGHT_BOTTOM);
        }

        vc.prototype.$notify = notify;
    }
}

export default vueNotifyPlugin;
