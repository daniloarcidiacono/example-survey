<style lang="scss">
  .Surveys {
    width: 100%;
    height: 100%;
    padding: 1em 15%;
    overflow-x: hidden;
    overflow-y: auto;

    &__Title {
    }

    &__Table {
      margin-top: 2em;
    }
  }
</style>

<template>
  <div class="Surveys">
    <AlertMessage v-if="isError" icon="mdi-alert-circle-outline">
      Could not load surveys, <a href="#" @click.stop="load">retry.</a>
    </AlertMessage>

    <template v-else>
      <h1 class="Surveys__Title text-h3 font-weight-light">Surveys</h1>
      <v-data-table class="Surveys__Table elevation-1"
                    :headers="headers"
                    :items="surveys"
                    :items-per-page="5"
                    :loading="isLoading"
                    loading-text="Loading... Please wait">
        <template v-slot:item.avgScore="{ item }">
            {{ item.avgScore | round | optional }} out of {{ item.maxScore }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small
                  class="mr-2"
                  @click="beginTakeSurvey(item)">
            mdi-plus
          </v-icon>
          <v-icon small
                  class="mr-2"
                  @click="editSurvey(item)">
            mdi-magnify
          </v-icon>
        </template>
        <template v-slot:no-data>
            No surveys.
        </template>
      </v-data-table>

      <TakeSurveyDialog ref="takeSurveyDialog"
                        @save="takeSurvey($event.survey, $event.takeId)" />
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {LoadingState} from "@/shared/LoadingState";
  import {surveyApi} from "@/shared/api/APIExports";
  import {SurveyError} from "@/shared/api/survey/dto/SurveyError";
  import {Survey} from "@/shared/api/survey/dto/Survey";
  import AlertMessage from "@/components/AlertMessage.vue";
  import TakeSurveyDialog from "@/components/TakeSurveyDialog.vue";
  import {alertService} from "@/shared/services/AlertService";

  @Component({
    components: {
      TakeSurveyDialog,
      AlertMessage
    }
  })
  export default class Surveys extends Vue {
    public $refs!: {
      takeSurveyDialog: TakeSurveyDialog
    };

    private state: LoadingState = LoadingState.LOADING;
    private surveys: Survey[] = [];
    private headers: any[] = [
      {
        text: 'Name',
        align: 'start',
        value: 'name'
      },
      {
        text: 'Length',
        align: 'start',
        value: 'steps'
      },
      {
        text: 'Average score',
        align: 'start',
        value: 'avgScore'
      },
      {
        text: 'Completed',
        align: 'start',
        value: 'completedCount'
      },
      {
        text: 'Uncompleted',
        align: 'start',
        value: 'uncompletedCount'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ];

    public beforeMount() {
      this.load();
    }

    private load(): void {
      this.state = LoadingState.LOADING;

      surveyApi.fetchSurveys().then((surveys: Survey[]) => {
        this.surveys = surveys;
        this.state = LoadingState.LOADED;
      }).catch((error: SurveyError) => {
        alertService.error(`Could not fetch surveys: ${error.message}`);
        this.surveys = [];
        this.state = LoadingState.ERROR;
      });
    }

    public beginTakeSurvey(survey: Survey) {
      this.$refs.takeSurveyDialog.open(survey);
    }

    public takeSurvey(survey: Survey, takeId: string) {
      this.$router.push(`/take/${takeId}/step/1`);
    }

    public editSurvey(survey: Survey) {
        this.$router.push(`/survey/${survey.id}/takes`);
    }

    public get isLoading(): boolean {
      return this.state === LoadingState.LOADING;
    }

    public get isError(): boolean {
      return this.state === LoadingState.ERROR;
    }
  }
</script>
