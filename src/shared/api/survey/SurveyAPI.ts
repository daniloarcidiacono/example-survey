import {Survey} from '@/shared/api/survey/dto/Survey';
import {Take} from '@/shared/api/survey/dto/Take';
import {User} from '@/shared/api/survey/dto/User';
import {Question} from '@/shared/api/survey/dto/Question';
import {SurveyInfo} from '@/shared/api/survey/dto/SurveyInfo';

export interface SurveyAPI {
    fetchSurveys(): Promise<Survey[]>;
    fetchSurvey(surveyId: string): Promise<Survey>;
    fetchSurveyInfo(takeId: string): Promise<SurveyInfo>;

    fetchTake(takeId: string): Promise<Take>;
    fetchTakes(surveyId: string): Promise<Take[]>;
    takeSurvey(surveyId: string, user: User): Promise<string>;
    resumeTake(takeId: string): Promise<number>;

    fetchQuestion(takeId: string, step: number): Promise<Question>;
    answerQuestion(takeId: string, questionId: string, answer: string[]): Promise<void>;

    submitTake(takeId: string): Promise<void>;
}
