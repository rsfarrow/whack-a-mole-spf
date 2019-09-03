<template>
  <v-content>
    <v-card>
      <v-card-title>
        <div :class="['headline', 'text-uppercase']">
          All Time Highscores
        </div>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                High Score
              </th>
              <th class="text-left">
                Rate
              </th>
              <th class="text-left">
                # of Moles
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in highscores"
              :key="'hs-' + index"
              :class="{'accent': item.newHighscore}"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.numOfMoles }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-content>
</template>
<script>
import { APIService } from '../services/api-service.js'
const apiService = new APIService()
export default {
  name: 'highscores',
  data: () => ({
    highscores: []
  }),
  mounted () {
    this.getHighscores()
  },
  methods: {
    getHighscores () {
      apiService.getHighscores().then((resp) => {
        this.highscores = resp.scores
      })
    }
  }
}
</script>
