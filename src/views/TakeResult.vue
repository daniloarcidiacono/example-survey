<style lang="scss">
  .TakeResult {
    width: 100%;
    height: 100%;
    padding: 1em 15%;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>

<template>
  <div class="TakeResult">
    <AlertMessage v-if="isError" icon="mdi-alert-circle-outline">
      Could not load result, <a href="#" @click.stop="load">retry.</a>
    </AlertMessage>

    <v-progress-circular v-if="isLoading" indeterminate />

    <template v-if="hasLoaded">
      <v-container style="text-align: center">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h2">
              Congratulations {{ take.user.name }} {{ take.user.surname }}, your score is
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <img src="/images/tada.svg" style="max-width: 256px"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2 class="text-h2">
              {{ take.score }} out of {{ take.maxScore }}
            </h2>
            <v-rating :length="take.maxScore" :value="take.score" readonly />
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
              <a href="https://commons.wikimedia.org/wiki/File:Emojione_1F389.svg">Emoji One</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {LoadingState} from "@/shared/LoadingState";
  import {SurveyError} from "@/shared/api/survey/dto/SurveyError";
  import {surveyApi} from "@/shared/api/APIExports";
  import {alertService} from "@/shared/services/AlertService";
  import {Take} from "@/shared/api/survey/dto/Take";
  import {Survey} from '@/shared/api/survey/dto/Survey';

  @Component
  export default class TakeResult extends Vue {
    private state: LoadingState = LoadingState.LOADING;
    private survey: Survey | null = null;
    private take: Take | null = null;

    public beforeMount(): void {
      this.load();
    }

    @Watch("$route.params.takeId")
    private load(): void {
      this.state = LoadingState.LOADING;

      surveyApi.fetchTake(this.takeId).then((take: Take) => {
        this.take = take;
        this.state = LoadingState.LOADED;
      }).catch((error: SurveyError) => {
        alertService.error(`Could not fetch take: ${error.message}`);
        this.take = null;
        this.state = LoadingState.ERROR;
      });
    }

    public goHome(): void {
      this.$router.push("/");
    }

    public get takeId(): string {
      return this.$route.params.takeId;
    }

    public get isLoading(): boolean {
      return this.state === LoadingState.LOADING;
    }

    public get isError(): boolean {
      return this.state === LoadingState.ERROR;
    }

    public get hasLoaded(): boolean {
      return this.state === LoadingState.LOADED;
    }
  }
</script>
