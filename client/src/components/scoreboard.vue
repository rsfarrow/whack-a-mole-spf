<template>
  <div class="background">
    <v-row>
      <v-col :class="['text-center', 'red--text', 'text-uppercase', 'overline', 'ml-1', {'smaller-font': $vuetify.breakpoint.xsOnly}]">
        {{ title }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center red--text overline">
        {{ numberDisplay }}
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'scoreboard',
  props: {
    numberDisplay: [Number, String],
    title: String
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Wallpoet&display=swap');
.overline {
  font-size: 46px !important;
  &.smaller-font {
    font-size: 32px !important;
  }
  font-family: Wallpoet;
}
.background {
  background-color: black;
  max-height: 100px;
}
</style>
