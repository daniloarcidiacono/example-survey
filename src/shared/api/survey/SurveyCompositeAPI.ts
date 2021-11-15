import {SurveyAPI} from '@/shared/api/survey/SurveyAPI';
import {surveyInMemoryAPI} from '@/shared/api/survey/SurveyInMemoryAPI';
import {Question} from '@/shared/api/survey/dto/Question';
import {Survey} from '@/shared/api/survey/dto/Survey';
import {Take} from '@/shared/api/survey/dto/Take';
import {User} from '@/shared/api/survey/dto/User';
import {configService} from '@/shared/services/ConfigService';
import {surveyRemoteAPI} from '@/shared/api/survey/SurveyRemoteAPI';
import {SurveyInfo} from '@/shared/api/survey/dto/SurveyInfo';

export class SurveyCompositeAPI implements SurveyAPI {
    public answerQuestion(takeId: string, questionId: string, answer: string[]): Promise<void> {
        return this.api!.answerQuestion(takeId, questionId, answer);
    }

    public fetchQuestion(takeId: string, step: number): Promise<Question> {
        return this.api!.fetchQuestion(takeId, step);
    }

    public fetchSurveyInfo(takeId: string): Promise<SurveyInfo> {
        return this.api!.fetchSurveyInfo(takeId);
    }

    public fetchSurveys(): Promise<Survey[]> {
        return this.api!.fetchSurveys();
    }

    public fetchSurvey(surveyId: string): Promise<Survey> {
        return this.api!.fetchSurvey(surveyId);
    }

    public fetchTakes(surveyId: string): Promise<Take[]> {
        return this.api!.fetchTakes(surveyId);
    }

    public fetchTake(takeId: string): Promise<Take> {
        return this.api!.fetchTake(takeId);
    }

    public takeSurvey(surveyId: string, user: User): Promise<string> {
        return this.api!.takeSurvey(surveyId, user);
    }

    public resumeTake(takeId: string): Promise<number> {
        return this.api!.resumeTake(takeId);
    }

    public submitTake(takeId: string): Promise<void> {
        return this.api!.submitTake(takeId);
    }

    private get api(): SurveyAPI {
        return !configService.surveyEnabled ? surveyInMemoryAPI : surveyRemoteAPI;
    }
}
