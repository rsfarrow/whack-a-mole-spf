<template>
  <div id="ttt-game">
    <!-- Add who is playing or who is the winner -->
    <div class="mx-auto display-2">
      {{ winner ? `Winner is: ${winner}` : `Current Player:  ${xIsNext ? 'X' : 'O'}` }}
      <v-btn
        :color="winner ? 'primary' : 'secondary'"
        @click="restartGame()"
      >
        Restart Game
      </v-btn>
    </div>
    <div class="board mx-auto">
      <square
        v-for="(square, index) in numOfSquares"
        :key="index"
        :value="history[stepNumber].squares[index]"
        :index="index"
        :numInRow="numInRow"
        @click="handleClick(index)"
      />
    </div>
    <settings
      v-model="showSettings"
      :darkMode="darkMode"
      @updateSettings="updateSettings($event)"
    />
    <v-footer class="ml-auto mt-auto"
              align-end
              :color="'transparent'"
    >
      <v-spacer />
      <v-btn
        id="settings-btn"
        :input-value="false"
        icon
        text
        small
        @click="showSettings = true"
      >
        <v-icon> mdi-settings </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Square from '../components/square.vue'
import Settings from './settings.vue'
import Vue from 'vue'
import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)
export default {
  name: 'tic-tac-toe',
  components: {
    Square,
    Settings
  },
  data: () => ({
    numInRow: 3,
    xIsNext: true,
    history: [{
      squares: []
    }],
    stepNumber: 0,
    numOfSquares: 0,
    winningCombos: [],
    showSettings: false,
    winner: null
  }),
  computed: {

    ...mapGetters(['darkMode']),
    cross () {
      return require('../../../public/img/cross2.svg')
    },
    circle () {
      return require('../../../public/img/circle2.svg')
    }
  },
  mounted () {
    this.getWinningCombos(this.numInRow, this.winningCombos)
    this.numOfSquares = this.numInRow * this.numInRow
    this.history[0].squares = Array(this.numOfSquares).fill(null)
  },
  methods: {
    // TODO: Merge the two different games
    // TODO: Show a winner, add a restart game
    // TODO: Add a 1 player mode (Play with computer)
    // TODO: Add a way to show the winners marks
    handleClick (i) {
      console.log('handle click entry, get current')
      let current = this.history[this.history.length - 1]
      console.log('handle click, current: ', current)
      let squares = current.squares.slice()
      console.log('handle click, squares: ', squares)
      // This is a premature check. We need to see after we insert.
      // We're checking on an old set. BS!
      // this.winner = this.calculateWinner(squares)
      if (!this.winner && !squares[i]) {
        squares[i] = this.xIsNext ? 'X' : 'O'
        this.history.push({ squares: squares })
        console.log('We put the square in, now history: ', this.history)
        this.xIsNext = !this.xIsNext
        this.stepNumber = this.history.length - 1
        console.log('We put the square in, new stepNum: ', this.stepNumber)
        this.winner = this.calculateWinner(squares)
        if (this.winner) {
          this.$confetti.start({
            particles: [
              {
                type: 'image',
                size: '25',
                url: this.winner === 'X' ? this.cross : this.circle,
                color: 'blue'
              }
            ]
          })
        }
      }
    },
    restartGame () {
      this.$confetti.stop()
      this.history.splice(1, this.history.length - 1)
      this.stepNumber = 0
      this.xIsNext = true
      this.winner = null
    },
    calculateWinner (squares) {
      console.log('Calculate winner Entry: Squares: ', JSON.stringify(squares))
      const lines = this.winningCombos

      // Loop through each array in 'lines'
      // which are the winning combinations
      for (let i = 0; i < lines.length; i++) {
        // one of the winning combos from the list of all winning combos
        let winningCombo = lines[i]
        let prevMatch = true

        // squares is the game board, an array 0-8, showing all the squares
        // null, X, or O are the options for an entry
        // if we have something at squares[winningCombo[0]], that means we can start checking the
        // sequence, otherwise, move on to the next combo.
        if (squares[winningCombo[0]]) {
          // Loop through the winning combo, and if the squares match, continue onto the next one, otherwise
          // break out of the loop because we know it's not a winner
          for (let j = 1; j < winningCombo.length; j++) {
            prevMatch = squares[winningCombo[0]] === squares[winningCombo[j]]
            if (!prevMatch) {
              break
            }
          }
          // once we finish going through the winning combo, if we have matched, return the match
          // they are a winner.
          if (prevMatch) {
            return squares[winningCombo[0]]
          }
        }
      }
      // Otherwise if we finish everything and nothing satisfied we can return null and let them know
      // that no one won.
      console.log('Calculate winner end:')
      return null
    },
    getWinningCombos (n, winningCombos) {
      this.horizontalWins(n, winningCombos)
      this.verticalWins(n, winningCombos)
      this.fDiagwins(n, winningCombos)
      this.bDiagWins(n, winningCombos)
    },
    horizontalWins (n, winningNums) {
      let cursor = 0
      for (let i = 0; i < n; i++) {
        let numberArray = []
        for (let j = 0; j < n; j++) {
          numberArray.push(cursor)
          cursor++
        }
        winningNums.push(numberArray)
      }
    },
    verticalWins (n, winningNums) {
      let cursor = 0
      for (let i = 0; i < n; i++) {
        let numberArray = []
        for (let j = 0; j < n; j++) {
          if (numberArray.length > 0) {
            numberArray.push(numberArray[j - 1] + n)
          } else {
            numberArray.push(cursor)
          }
        }
        cursor++
        winningNums.push(numberArray)
      }
    },
    fDiagwins (n, winningNums) {
      let cursor = 0
      let numberArray = []
      for (let i = 0; i < n; i++) {
        if (numberArray.length > 0) {
          numberArray.push(numberArray[i - 1] + n + 1)
        } else {
          numberArray.push(cursor)
        }
      }
      winningNums.push(numberArray)
    },
    bDiagWins (n, winningNums) {
      let cursor = n - 1
      let index = 0
      let numberArray = []
      for (let i = n; i > 0; i--) {
        if (numberArray.length > 0) {
          numberArray.push(numberArray[index - 1] + n - 1)
        } else {
          numberArray.push(cursor)
        }
        index++
      }
      winningNums.push(numberArray)
    },
    updateSettings (event) {
      event.darkMode ? this.$store.dispatch('turnOnDarkMode') : this.$store.dispatch('turnOffDarkMode')
      this.$vuetify.theme.dark = this.darkMode
    }
  }
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 35px;
  max-width: 700px;
}
</style>
