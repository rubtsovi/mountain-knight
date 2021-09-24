<template>
  <div class="fixed px-4 h-screen w-screen flex justify-center items-center">
    <div id="singup-popup-backdrop"
         @click="close()"
         class="top-0 left-0 bg-[rgba(0,0,0,.7)] absolute w-full h-full">
    </div>
    <transition name="vertical-slide"
                appear
                enter-active-class="animated faster fadeInUp">
      <div id="popup" class="p-10 bg-white max-w-sm relative">
        <div class="text-lg tracking-wide text-center">Are you a Mountain Knight?</div>
        <div id="form" class="py-5">
          <div class="relative overflow-hidden">
            <input
                id="login-control"
                v-model.lazy="login"
                @blur="v$.login.$touch"
                type="text"
                placeholder="Email"
                class="control mb-6"
            />
            <transition name="slide"
                        enter-active-class="animated faster fadeInLeft"
                        leave-active-class="animated faster fadeOutRight">
              <div key="required" v-if="v$.login.$dirty && v$.login.required.$invalid"
                   class="text-sm text-red-500 text-center absolute bottom-0 pt-1 w-full">
                {{ v$.login.required.$message }}
              </div>
              <div key="email" v-if="v$.login.$dirty && v$.login.email.$invalid"
                   class="text-sm text-red-500 text-center absolute bottom-0 pt-1 w-full">
                {{ v$.login.email.$message }}
              </div>
            </transition>
          </div>
          <div class="relative overflow-hidden">
            <input
                id="password-control"
                v-model.lazy="password"
                @blur="v$.password.$touch"
                type="password"
                placeholder="Password"
                class="control mb-6"
            />
            <transition name="slide"
                        enter-active-class="animated faster fadeInLeft"
                        leave-active-class="animated faster fadeOutRight">
              <div key="required" v-if="v$.password.$dirty && v$.password.required.$invalid"
                   class="text-sm text-red-500 text-center absolute bottom-0 pt-1 w-full">
                {{ v$.password.required.$message }}
              </div>
            </transition>

          </div>
          <button @click="onSubmit" class="btn primary w-full mt-4">
            <span class="inline-block relative">Log in</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import useVuelidate from '@vuelidate/core';
import {required, email} from '@vuelidate/validators';
import {NotificationContext, NotificationType, Position} from "@plugin/enums";

Component.registerHooks(['validations']);

type DummyResponse = {
  status: string;
  message: string;
};

@Component({
  name: 'signup-popup',
  setup() {
    return {
      v$: useVuelidate()
    }
  }
})
export default class SignupPopupComponent extends Vue {
  private login = '';
  private password = '';

  @Prop({type: Boolean, default: false})
  private isFetching!: boolean;

  mounted() {
    window.addEventListener('keyup', this.close)
  }

  private close(keyEvent?: KeyboardEvent) {

    if (typeof keyEvent !== 'undefined' && keyEvent.key !== 'Escape')
      return;

    this.$emit('close');
    return;
  }

  destroyed() {
    window.removeEventListener('keyup', this.close);
  }

  private onSubmit() {
    // @ts-ignore
    this.v$.$validate()
        .then((isValid: boolean) => {
          if (!isValid)
            throw new Error('form is invalid!');

          const fd = new FormData();
          fd.append('login', this.login);
          fd.append('password', this.password);
          return fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'post',
            mode: 'no-cors', // TODO: only for tests. remove before deploy!!!
            body: fd,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        })
        .then((res: Response) => {
          if (!res.ok)
            throw new Error(res.statusText);

          // Something wrong with server, getting 500 Internal server error all the time :/
          // return {status: 'ok', message: 'Hello 😉! How are you?'};
          return res.json();
        })
        .then(({message, status}: DummyResponse) => {
          if (status !== 'ok')
            throw new Error(message);

          this.$notify(
              {text: message, header: "Success!", context: NotificationContext.SUCCESS},
              {type: NotificationType.TOAST, position: Position.CENTER_TOP}
          );

          this.$emit('close');
        })
        .catch((e: Error) => {
          this.$notify(
              {text: e.message, header: 'Login failed', context: NotificationContext.DANGER},
              {position: Position.CENTER_TOP, type: NotificationType.TOAST}
          );
        })
  }

  validations() {
    return {
      login: {required, email},
      password: {required}
    }
  }

}
</script>

<style scoped>

</style>