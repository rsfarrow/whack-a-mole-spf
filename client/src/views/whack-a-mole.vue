<template>
  <v-layout
    column
    justify-center
    align-center
    fill-height
    class="mx-3 "
  >
    <h1>Score: {{ counter }}</h1>
    <h1>Timer: {{ timer }}</h1>
    <v-btn
      @click="startGame()"
    >
      Start Game
    </v-btn>
    <mole
      v-for="(mole, index) in moles"
      ref="mole"
      :key="mole"
      :rate="1"
      :numOfMoles="moles.length"
      :index="index"
      @active="counter++"
    />
  </v-layout>
</template>
<script>
import Mole from '../components/mole.vue'
export default {
  name: 'whack-a-mole',
  components: { Mole },
  data: () => ({
    moles: [1, 2, 3],
    counter: 0,
    timer: 10,
    timeOut: ''
  }),
  methods: {
    startGame () {
      this.$refs.mole.forEach((mole) => {
        mole.startTime()
      })
      this.timer = 10
      this.startTimer()
    },
    startTimer () {
      this.timeOut = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearTimeout(this.timeOut)
          this.$refs.mole.forEach((mole) => {
            mole.stopTime()
          })
        }
      }, 1000)
    }
  }
}
</script>
