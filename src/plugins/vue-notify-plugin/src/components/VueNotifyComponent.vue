<template>
    <div class="v-notify-container">
        <transition-group
            v-for="toastContainer in toastContainers"
            :key="`toast-container-${toastContainer.position}`"
            tag="div"
            appear
            :name="`toasts-${toastContainer.position}`"
            :class="`toast-container ${toastContainer.position}`"
        >
            <toast-component
                v-for="toast in toastContainer.toasts"
                :key="toast.id"
                ref="toast"
                :toast="toast"
                :container-position="toastContainer.position"
                @close="onCloseToast($event, toastContainer)"
            />
        </transition-group>
    </div>
</template>container

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import ToastComponent from "@plugin/components/ToastComponent.vue";
import Toast from "@plugin/classes/Toast";
import { Position } from "@plugin/enums";

type ToastContainer = {
  position: Position;
  toasts: Toast[];
};

@Component({
    name: "vue-notify",
    components: {ToastComponent}
})
export default class VueNotifyComponent extends Vue {
    private toasts!: Toast[]; // probably to remove

    private toastContainers: ToastContainer[] = [];

    // TODO: add class for popup alerts
    private popupAlerts!: any[];

    public addToast(toast: Toast, position: Position): void {
        const container = this.getContainerByPosition(position);
        container.toasts.push(toast);
    }

    public onCloseToast(closingToast: Toast, inContainer: ToastContainer): Toast{
        const index = inContainer.toasts.indexOf(closingToast);
        inContainer.toasts.splice(index, 1);
        if(inContainer.toasts.length === 0){
            const containerIndex = this.toastContainers.indexOf(inContainer);
            this.toastContainers.splice(containerIndex, 1);
        }

        if(this.toastContainers.length === 0) {
            this.$destroy();
        }

        return closingToast;
    }


    private getContainerByPosition(p: Position) {
        const container = this.toastContainers.find(({position}) => position === p);
        if (container) {
            return container;
        }

        const newContainer: ToastContainer = {
            position: p,
            toasts: [],
        };

        this.toastContainers.push(newContainer);
        return newContainer;
    }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
$grid-gutter-width: 30px;
.toast-container {
  position: fixed;
  z-index: 10;
  width: calc(100vw - #{$grid-gutter-width});
  max-width: 350px;
  >div{
    transition: ease-in-out .200s;
    transition-property: transform, opacity;
    opacity: 1;

    &[class*="-enter"],&[class*="-leave-to"]{
      opacity: 0;
    }

    &[class*="-leave-active"]{
      position: absolute;
    }
  }


  /**** GROUP BY POSITION ****/
  &.left-top, &.right-top, &.center-top {
    top: math.div($grid-gutter-width, 2);
    >div{
      &[class*="-enter"]{
        transform: translateY(-50%);
      }
    }
  }

  &.right-bottom, &.left-bottom, &.center-bottom {
    bottom: math.div($grid-gutter-width, 2);
    >div{
      &[class*="-enter"]{
        transform: translateY(50%);
      }
    }
  }

  &.left-top, &.left-bottom {
    left: math.div($grid-gutter-width, 2);
  }

  &.right-top, &.right-bottom {
    right: math.div($grid-gutter-width, 2);
  }

  &.center-top, &.center-bottom{
    margin: auto;
    left: 0;
    right: 0;
  }
}

.toast-outer-enter-active {
  transition: 0.2s linear;
  transition-property: transform, opacity, margin-bottom, margin-top;
}

.toast-outer-enter {
  opacity: 0;
}
</style>
