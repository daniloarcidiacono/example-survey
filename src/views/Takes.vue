<style lang="scss">
  .Takes {
    width: 100%;
    height: 100%;
    padding: 1em 10%;
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
  <div class="Takes">
    <AlertMessage v-if="isError" icon="mdi-alert-circle-outline">
      Could not load takes, <a href="#" @click.stop="load">retry.</a>
    </AlertMessage>

    <template v-if="hasLoaded">
      <h1 class="Takes__Title text-h3 font-weight-light">Takes of "{{ survey.name }}"</h1>
      <v-data-table class="Takes__Table elevation-1"
                    :headers="headers"
                    :items="takes"
                    :items-per-page="5"
                    :loading="isLoading"
                    loading-text="Loading... Please wait">
        <template v-slot:item.user.email="{ item }">
          {{ item.user.email | optional }}
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score | optional }} out of {{ survey.maxScore }}
        </template>
        <template v-slot:item.startedDateTime="{ item }">
          {{ item.startedDateTime | isodatetime }}
        </template>
        <template v-slot:item.completedDateTime="{ item }">
          {{ item.completedDateTime | isodatetime | optional }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon v-if="item.score"
                  small
                  class="mr-2"
                  @click="goToResult(item)">
            mdi-magnify
          </v-icon>
          <v-icon v-if="!item.score"
                  small
                  class="mr-2"
                  @click="editTake(item)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
            No takes.
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {LoadingState} from '@/shared/LoadingState';
  import {surveyApi} from '@/shared/api/APIExports';
  import {SurveyError} from '@/shared/api/survey/dto/SurveyError';
  import {Take} from '@/shared/api/survey/dto/Take';
  import AlertMessage from '@/components/AlertMessage.vue';
  import {alertService} from '@/shared/services/AlertService';
  import {Survey} from '@/shared/api/survey/dto/Survey';

  @Component({
    components: {
      AlertMessage
    }
  })
  export default class Takes extends Vue {
    private state: LoadingState = LoadingState.LOADING;
    private survey: Survey | null = null;
    private takes: Take[] = [];
    private headers: any[] = [
      {
        text: 'Name',
        align: 'start',
        value: 'user.name'
      },
      {
        text: 'Surname',
        align: 'start',
        value: 'user.surname'
      },
      {
        text: 'Age',
        align: 'start',
        value: 'user.age'
      },
      {
        text: 'Email',
        align: 'start',
        value: 'user.email'
      },
      {
        text: 'Score',
        align: 'start',
        value: 'score'
      },
      {
        text: 'Started at',
        align: 'start',
        value: 'startedDateTime'
      },
      {
        text: 'Completed at',
        align: 'start',
        value: 'completedDateTime'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ];

    public constructor() {
      super();
      this.load();
    }

    private load(): void {
      this.state = LoadingState.LOADING;

      Promise.all([
        surveyApi.fetchSurvey(this.$route.params.surveyId),
        surveyApi.fetchTakes(this.$route.params.surveyId)
      ]).then(([survey, takes]) => {
        this.survey = survey;
        this.takes = takes;
        this.state = LoadingState.LOADED;
      }).catch((error: SurveyError) => {
        alertService.error(`Could not fetch takes: ${error.message}`);
        this.survey = null;
        this.takes = [];
        this.state = LoadingState.ERROR;
      });
    }

    public goToResult(take: Take) {
      this.$router.push(`/take/${take.id}/result`);
    }

    public editTake(take: Take) {
      surveyApi.resumeTake(take.id).then((step: number) => {
        this.$router.push(`/take/${take.id}/step/${step}`);
      }).catch((error: SurveyError) => {
        alertService.error(`Could not resume takes ${error.message}`);
      });
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
