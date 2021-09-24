/* eslint-disable max-classes-per-file */
import Vue, { PluginFunction, PluginObject } from "vue";
import { VueConstructor } from "vue/types/umd";
import { CombinedVueInstance } from "vue/types/vue";
import Toast from "./classes/Toast";

import { NotificationContext, NotificationType, Position } from "./enums";

import "./vue-injections";

export interface VueNotifyPluginOptions {
  rootSelector?: string;
  delay?: number;
  animationDuration?: number;
  closeIconConfig?: string;
}

export interface NotificationProps {
  type: NotificationType;
  position?: Position;
}

export type NotificationMessage = {
  text: string;
  header?: string;
  context?: NotificationContext;
}

// Plugin definition
export interface VueNotifyPlugin extends PluginObject<VueNotifyPluginOptions> {
    install: PluginFunction<VueNotifyPluginOptions>
}

export class VueNotifyToastComponent extends Vue{
    // Simple catch-all to allow any prop/type
  [key: string]: any;
}

export type VueNotifyComponentMethods = {
  addToast: (toast: Toast, position: Position) => void
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type VueNotifyComponent = VueConstructor<CombinedVueInstance<Vue, object, VueNotifyComponentMethods, object, never>>

