<template>
  <canvas
    class="w-full min-h-screen"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    ref="canvas"
  />
</template>

<script>
import { inject, onMounted, ref } from 'vue'

export default {
  setup() {
    const socket = inject('socket')
    const options = ref({
      color: '#cc6666',
      radius: 5
    })

    let canvas = ref(null)
    let ctx = ref(null)
    let isMouseDown = ref(false)
    let startPoints = ref({})
    let movingPoints = ref([])

    socket.on('draw', (data) => {
      init(data)
    })

    socket.on('reset', (data) => {
      ctx.clearRect(0, 0, canvas.value.clientWidth, canvas.value.clientHeight)

      init(data)
    })

    onMounted(() => {
      ctx = canvas.value.getContext('2d')

      canvas.value.node = canvas.value
      canvas.value.node.width = canvas.value.clientWidth
      canvas.value.node.height = canvas.value.clientHeight
    })

    function onMouseDown(e) {
      isMouseDown.value = true

      startPoints.value = {
        x: e.pageX,
        y: e.pageY
      }
    }

    function onMouseMove(e) {
      if (!isMouseDown.value) {
        return
      }

      movingPoints.value.push({
        x: e.pageX,
        y: e.pageY
      })

      draw(movingPoints.value)
    }

    function onMouseUp(e) {
      isMouseDown.value = false

      socket.emit('draw', {
        start: startPoints.value,
        moving: movingPoints.value,
      })

      startPoints.value = {}
      movingPoints.value = []
    }

    function draw(movingPoints) {
      ctx.beginPath()
      ctx.lineJoin = ctx.lineCap = 'round'

      ctx.moveTo(startPoints.x, startPoints.y)

      for (let j = 0; j < movingPoints.length; j++) {
        ctx.strokeStyle = options.value.color
        ctx.lineWidth = options.value.radius

        ctx.lineTo(movingPoints[j].x, movingPoints[j].y)
      }

      ctx.stroke()
    }

    function init(allData) {
      if (!Array.isArray(allData)) {
        allData = [allData]
      }

      for (let i = 0; i < allData.length; i++) {
        ctx.beginPath()
        ctx.lineJoin = ctx.lineCap = 'round'

        const data = allData[i]

        ctx.moveTo(data.start.x, data.start.y)

        for (let j = 0; j < data.moving.length; j++) {
          ctx.strokeStyle = options.value.color
          ctx.lineWidth = options.value.radius

          ctx.lineTo(data.moving[j].x, data.moving[j].y)
        }

        ctx.stroke()
      }
    }

    return {
      canvas,
      ctx,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      draw,
      init
    }
  }
}
</script>
