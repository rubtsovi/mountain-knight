<template>
    <div ref="outerContainer" :class="`v-notify-toast-outer ${containerPosition}`">
        <transition
            name="close-toast"
            @before-leave="setOuterContainerHeight"
            @after-leave="$emit('close', toast)"
        >
            <div
                v-if="toast.isVisible"
                :class="`v-notify-toast ${toast.context}`"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div v-if="toast.header" class="v-notify-toast-header">
                    <span>{{ toast.header }}</span>
                    <span @click="close">close</span>
                </div>
                <div class="v-notify-toast-body">
                    {{ toast.message }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import Toast from "@plugin/classes/Toast";
import { Position } from "@plugin/enums";

@Component({
    name: "toast",
})
export default class ToastComponent extends Vue{
    @Prop({
        type: Toast,
        required: true
    })
    private toast!: Toast;

    @Prop({
        type: String,
        required: true
    })
    private containerPosition!: Position;

    public close(): void{
        this.toast.isVisible = false;
    }

    public setOuterContainerHeight(): void{
        const outerContainer = this.$refs.outerContainer as HTMLElement;
        const containerHeight = outerContainer.clientHeight;
        outerContainer.style.height = `${containerHeight}px`;
    }
}
</script>

<style lang="scss" scoped>
$grid-gutter-width: 30px !default;
.v-notify-toast-outer {
  width: 100%;

  &.right-bottom, &.right-top{
      .close-toast-leave-to{
          transform: translateX(100%);
      }
  }

  &.left-bottom, &.left-top{
      .close-toast-leave-to{
          transform: translateX(-100%);
      }
  }
}

.v-notify-toast {
  opacity: 1;
  transition: .2s linear;
  transition-property: opacity, transform;
}

.close-toast-leave-to{
    opacity: 0;
}

</style>
