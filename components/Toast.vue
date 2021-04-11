<template>
  <transition name="fade">
    <div :class="(this.toastConf.type==='Success' ? 'bg-green-50 border-l-4 border-green-400 text-green-500' : '' )+ (this.toastConf.type==='Info' ? 'bg-blue-50 border-l-4 border-blue-400 text-blue-500' : '' ) + (this.toastConf.type==='Error' ? 'bg-red-50 border-l-4 border-red-400 text-red-500' : '' ) + ' px-4 py-2 fixed top-8 right-8 toast '+(this.toastState ? '' : 'toast-transition')" role="alert">
      <p class="font-bold text-sm flex justify-between">
        <span>
          {{this.toastConf.type}}
        </span>
        <svg class="w-4 h-4 inline cursor-pointer self-center stroke-4" @click="closeToast()" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </p>
      <p class="text-xs mt-0.5 text-left">{{this.toastConf.message}}</p>
    </div>
  </transition>
</template>
<script>
  export default {
      components: {

      },

      computed: {
        toastConf () {
            return this.$store.state.toastConf
        },
        toastState () {
            return this.$store.state.toastState
        }
      },

      data() {
        return {
          
        }
      },

      methods: {
        async closeToast() {
          this.$store.commit('setToastState', {status: false});
        }
      },
      mounted: function () {

      },
  }
</script>
<style>
  .toast{
    min-width: 250px;
    transition: opacity 0.5s;
    z-index: 1;
  }
  .toast-transition{
    opacity: 0;
    z-index: -1;
  }
</style>