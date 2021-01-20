<template>
  <div class="min-w-full min-h-screen bg-white">
    <Draw />
    <ResetButton />
  </div>
</template>

<script>
import Draw from './components/Draw.vue'
import ResetButton from './components/ResetButton.vue'

export default {
  components: {
    Draw,
    ResetButton
  }
}
</script>
