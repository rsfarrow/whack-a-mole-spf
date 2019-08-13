<template>
  <v-content>
    <v-dialog
      v-model="show"
      persistent
    >
      <v-card>
        <v-card-title>
          <div class="headline text-uppercase">
            GAME OVER
          </div>
          <v-spacer />
          <v-icon
            @click="$emit('click:outside', false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <div class="title">
            Your current score: {{ currentScore }}
          </div>
          <v-divider />
          <div class="title">
            Your high score
          </div>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  High Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in [{name: 'Sam', score: '5'}, {name: 'Sam', score: currentScore}]"
                  :key="index"
                  class="hs"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <div class="title">
            All time high scores
          </div>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  High Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in highScores" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
export default {
  model: {
    prop: 'showDialog',
    event: 'click:outside'
  },
  props: {
    showDialog: Boolean,
    currentScore: Number
  },
  data: () => ({
    show: false,
    highScores: [{ name: 'Sam', score: '12' }, { name: 'Sam', score: '10' }, { name: 'Sam', score: '8' }, { name: 'Sam', score: '6' }, { name: 'Sam', score: '4' }]
  }),
  watch: {
    showDialog () {
      this.show = this.showDialog
    }
  }
}
</script>
