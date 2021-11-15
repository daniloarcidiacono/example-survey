import {SurveyAPI} from '@/shared/api/survey/SurveyAPI';
import {SurveyCompositeAPI} from '@/shared/api/survey/SurveyCompositeAPI';

export const surveyApi: SurveyAPI = new SurveyCompositeAPI();
