<template>
  <span :class="['dot', {active: active}]"
        @click="emitActive()"
  />
</template>
<script>
export default {
  name: 'mole',
  props: {
    rate: Number,
    index: Number,
    numOfMoles: Number
  },
  data: () => ({
    active: false,
    timeout: ''
  }),
  methods: {
    startTime () {
      this.timeout = setInterval(() => {
        this.getRandomTime()
      }, this.rate * 1000)
    },
    stopTime () {
      clearTimeout(this.timeout)
      this.active = false
    },
    getRandomTime () {
      if (!this.active) {
        let random = Math.floor(Math.random() * this.numOfMoles)
        if (random === this.index) {
          this.active = true
        }
      } else {
        this.active = false
      }
    },
    emitActive () {
      if (this.active) {
        this.active = false
        this.$emit('active')
      }
    }
  }
}
</script>

<style scoped style="scss">

.dot {
  margin: 35px;
  height: 25px;
  width: 25px;
  background-color: lightgray;
  border-radius: 50%;
  display: inline-block;
}
.active {
  background-color: black !important;
}
.full-height {
  height: 100%;
}
</style>
