<style lang="scss">
  .App {
    &__Toolbar {
      cursor: pointer;
    }
  }
</style>

<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links"
               :key="link.text"
               text
               @click="go(link.path)">
          <v-icon left v-if="!!link.icon">{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <Alerts />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Alerts from '@/components/Alerts.vue';

@Component({
    components: {
        Alerts
    }
})
export default class App extends Vue {
  public links: any[] = [
    {
      text: "Surveys",
      path: "/",
      icon: "mdi-file"
    },
    {
      text: "Settings",
      path: "/settings",
      icon: "mdi-cog"
    },
    {
      text: "Tips",
      path: "/tips",
      icon: "mdi-lightbulb"
    }
  ];

  public goHome() {
    this.go('/');
  }

  public go(path: string) {
    if (this.$route.path !== path) {
      this.$router.push(path);
    }
  }
}

</script>
