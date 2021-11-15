<style lang="scss">
  .Settings {
      width: 100%;
      height: 100%;
      padding: 1em 15%;
      overflow-x: hidden;
      overflow-y: auto;

      &__Title {
          margin-bottom: 0.5em;
      }

      &__Button {
        margin-top: 1em;
      }
  }
</style>

<template>
  <div class="Settings">
      <h1 class="Settings__Title text-h3 font-weight-light">Settings</h1>
      <v-alert style="min-width: 512px"
               border="top"
               colored-border
               color="indigo"
               elevation="2">
          <v-form v-model="valid">
              <v-checkbox v-model="config.surveyEnabled"
                          label="Enable Survey service" />

              <v-text-field v-model="config.surveyBaseUrl"
                            label="Survey base URL"
                            name="surveyBaseUrl"
                            prepend-icon="mdi-link"
                            type="text"
                            autofocus />
          </v-form>
      </v-alert>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ConfigService, configService} from "@/shared/services/ConfigService";

@Component
export default class Settings extends Vue {
    public valid: boolean = false;
    public config: ConfigService = configService;
}
</script>
