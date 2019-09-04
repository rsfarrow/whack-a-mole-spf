<template>
  <span
    :class="['moles', {active: active}]"
    @click="emitActive()"
  >
    <v-img
      v-if="!active"
      id="bush"
      :src="bush"
      :aspect-ratio="1"
    />
    <v-img
      v-else
      id="mole"
      :src="moleFace"
      :aspect-ratio="1"
    />
  </span>
</template>
<script>
export default {
  name: 'mole',
  props: {
    rate: Number,
    index: Number,
    numOfMoles: Number,
    offset: Number
  },
  data: () => ({
    active: false,
    timeout: ''
  }),
  computed: {
    moleFace () {
      return require('../../../public/img/mole.png')
    },
    bush () {
      return require('../../../public/img/bush.png')
    }
  },
  methods: {
    startTime () {
      this.timeout = setInterval(() => {
        this.getRandomTime()
      }, 1000 / this.rate + this.offset)
    },
    stopTime () {
      clearTimeout(this.timeout)
      this.timeout = ''
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

.moles {
  height: 50px;
  width: 50px;
}
</style>
