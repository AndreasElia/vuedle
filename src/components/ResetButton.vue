<template>
  <button
    class="absolute top-5 right-5 z-50 bg-indigo-500 text-white rounded-full font-semibold px-8 py-3 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
    @click="reset"
  >
    Reset
  </button>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const socket = inject('socket')

    function reset() {
      if (window.confirm('This affects everyone. Are you sure?')) {
        socket.emit('reset')
      }
    }

    return {
      reset,
    }
  }
}
</script>
