<style lang="scss">
  .PageNotFound {
    width: 100%;
    height: 100%;
    padding: 1em 15%;
    overflow-x: hidden;
    overflow-y: auto;

    &__Title {
    }
  }
</style>

<template>
  <div class="PageNotFound">
    <v-container style="text-align: center">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h2">
            Page not found!
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <img src="/images/not_found.svg" style="max-width: 256px"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn elevation="2"
                 color="primary"
                 @click="goHome">
            Return to surveys
            <v-icon right>mdi-exit-to-app</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div>
            <a href="https://thenounproject.com/term/not-found/48467/">Icon</a> by <a href="https://thenounproject.com/Julihan/">Julien Deveaux</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class PageNotFound extends Vue {
    public goHome(): void {
      this.$router.push("/");
    }
  }
</script>
