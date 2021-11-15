<style lang="scss">
  .TakeStep {
    width: 100%;
    height: 100%;
    padding: 1em 15%;
    overflow-x: hidden;
    overflow-y: auto;

    &__Info {

    }

    &__Title {
      margin-top: 1em;
    }

    &__Form {
      margin-top: 1em;
    }

    &__Buttons {
      display: flex;
      flex-flow: row nowrap;

      justify-content: flex-start;
      align-items: center;
      gap: 1em;
    }

    &__Score {
      &--neutral {
      }

      &--positive {
        color: green;
      }

      &--negative {
        color: red;
      }
    }

    &__ButtonBack {
    }

    &__ButtonNext {
    }

    &__ButtonExit {
      /* https://stackoverflow.com/questions/35269947/how-can-i-align-one-item-right-with-flexbox */
      margin-left: auto;
    }
  }
</style>

<template>
  <div class="TakeStep">
    <AlertMessage v-if="isError" icon="mdi-alert-circle-outline">
      Could not load question, <a href="#" @click.stop="load">retry.</a>
    </AlertMessage>

    <v-progress-circular v-if="isLoading" indeterminate />

    <template v-if="hasLoaded">
      <!-- Survey info -->
      <div class="TakeStep__Info">
        <div>{{ survey.name }} - {{ takeId }}</div>
        <div>{{ step }} of {{ survey.steps }}</div>
        <v-progress-linear :value="progress"></v-progress-linear>
      </div>


      <!-- Question -->
      <div class="TakeStep__Title">
        <h1 class="Surveys__Title text-h4 font-weight-light">{{ step }}. {{ question.text }}</h1>
      </div>

      <!-- Free text -->
      <div class="TakeStep__Form">
        <v-textarea v-if="isFreeText"
                    label="Answer"
                    v-model="question.answer[0]" />

        <!-- Date -->
        <v-menu v-if="isDate"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="question.answer[0]"
                          label="Pick a date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
            />
          </template>
          <v-date-picker v-model="question.answer[0]"
                         @input="menu = false" />
        </v-menu>

        <!-- Single choice -->
        <v-radio-group v-if="isSingleChoice" v-model="question.answer[0]">
          <v-radio v-for="option in question.options"
                   :key="option.id"
                   :label="option.text"
                   :value="option.id">
            <template v-slot:label>
              <div>
                {{ option.text }}

                <span :class="scoreClass(option.score)"
                      v-if="option.score !== null">
                  ({{ option.score }})
                </span>
              </div>
            </template>
          </v-radio>
        </v-radio-group>

        <!-- Multiple choices -->
        <template v-if="isMultipleChoice">
          <v-checkbox v-for="option in question.options"
                      v-model="question.answer"
                      dense
                      :label="option.text"
                      :value="option.id">
            <template v-slot:label>
              <div>
                {{ option.text }}

                <span :class="scoreClass(option.score)"
                      v-if="option.score !== null">
                  ({{ option.score }})
                </span>
              </div>
            </template>
          </v-checkbox>
        </template>
      </div>

      <!-- Button bar -->
      <div class="TakeStep__Buttons">
        <v-btn class="TakeStep__ButtonBack"
               elevation="2"
               :disabled="!hasBack || saving"
               @click="goBack">
          <v-icon left>mdi-chevron-left</v-icon>
          Back
        </v-btn>
        <v-btn class="TakeStep__ButtonNext"
               elevation="2"
               color="primary"
               :disabled="!hasNext || !hasAnswer || saving"
               @click="goNext">
          Next
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn class="TakeStep__ButtonExit"
               elevation="2"
               color="secondary"
               :disabled="saving"
               @click="goHome">
          Exit
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {LoadingState} from "@/shared/LoadingState";
  import {surveyApi} from "@/shared/api/APIExports";
  import {SurveyError} from "@/shared/api/survey/dto/SurveyError";
  import AlertMessage from "@/components/AlertMessage.vue";
  import {Question, TakeQuestionType} from "@/shared/api/survey/dto/Question";
  import {alertService} from "@/shared/services/AlertService";
  import {Survey} from "@/shared/api/survey/dto/Survey";
  import {SurveyInfo} from '@/shared/api/survey/dto/SurveyInfo';

  @Component({
    components: {
      AlertMessage
    }
  })
  export default class QuestionStep extends Vue {
    private state: LoadingState = LoadingState.LOADING;
    private question: Question | null = null;
    private survey: SurveyInfo | null = null;
    public menu: boolean = false;
    public saving: boolean = false;

    public beforeMount(): void {
      this.load();
    }

    @Watch("$route.params.step")
    private load(): void {
      this.state = LoadingState.LOADING;

      Promise.all(
          [
            surveyApi.fetchSurveyInfo(this.takeId),
            surveyApi.fetchQuestion(this.takeId, this.step)
          ]
      ).then(([survey, question]) => {
        this.question = question;
        this.survey = survey;
        this.state = LoadingState.LOADED;

        // Initialize the free text response as the empty string
        if (this.question.answer.length === 0 && this.question.type === TakeQuestionType.FREETEXT) {
          this.question.answer = [ "" ];
        }
      }).catch((error: SurveyError) => {
        alertService.error(`Could not fetch question: ${error.message}`);
        this.question = null;
        this.survey = null;
        this.state = LoadingState.ERROR;
      });
    }

    private async move(nextStep: number) {
      this.saving = true;

      try {
        if (this.hasAnswer) {
          await surveyApi.answerQuestion(this.takeId, this.question!.id, this.question!.answer);
        }

        if (nextStep == this.survey!.steps + 1) {
          await surveyApi.submitTake(this.takeId);
          this.$router.push(`/take/${this.takeId}/result`);
        } else {
          this.$router.push(`/take/${this.takeId}/step/${nextStep}`);
        }
      } catch (error) {
        alertService.error(`Could not save question: ${error.message}`);
      } finally {
        this.saving = false;
      }
    }

    public goBack(): void {
      this.move(this.step - 1);
    }

    public goNext(): void {
      this.move(this.step + 1);
    }

    public goHome(): void {
      this.$router.push("/");
    }

    public get isFreeText(): boolean {
      return this.hasLoaded && this.question!.type === TakeQuestionType.FREETEXT;
    }

    public get isDate(): boolean {
      return this.hasLoaded && this.question!.type === TakeQuestionType.DATE;
    }

    public get isSingleChoice(): boolean {
      return this.hasLoaded && this.question!.type === TakeQuestionType.SINGLE_CHOICE;
    }

    public get isMultipleChoice(): boolean {
      return this.hasLoaded && this.question!.type === TakeQuestionType.MULTIPLE_CHOICE;
    }

    public get hasAnswer(): boolean {
      if (!this.hasLoaded) {
        return false;
      }

      switch (this.question!.type) {
        case TakeQuestionType.FREETEXT:
        case TakeQuestionType.MULTIPLE_CHOICE:
          return true;

        case TakeQuestionType.DATE:
          return this.question!.answer.length > 0;

        case TakeQuestionType.SINGLE_CHOICE:
          return this.question!.answer.length > 0;
      }

      return false;
    }

    public scoreClass(score: number | null): object {
      return {
        'TakeStep__Score': true,
        'TakeStep__Score--neutral': score === 0,
        'TakeStep__Score--positive': score !== null && score > 0,
        'TakeStep__Score--negative': score !== null && score < 0
      };
    }

    public get hasBack(): boolean {
      return this.step > 1;
    }

    public get hasNext(): boolean {
      return this.hasLoaded && this.step <= this.survey!.steps + 1;
    }

    public get takeId(): string {
      return this.$route.params.takeId;
    }

    public get step(): number {
      return parseInt(this.$route.params.step);
    }

    public get progress(): number {
      return this.hasLoaded ? Math.trunc(this.step / this.survey!.steps * 100) : 0;
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
