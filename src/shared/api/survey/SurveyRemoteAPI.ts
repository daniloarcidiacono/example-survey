import {SurveyAPI} from '@/shared/api/survey/SurveyAPI';
import {Question, TakeQuestionType} from '@/shared/api/survey/dto/Question';
import {Survey} from '@/shared/api/survey/dto/Survey';
import {Take} from '@/shared/api/survey/dto/Take';
import {User} from '@/shared/api/survey/dto/User';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {SurveyError} from '@/shared/api/survey/dto/SurveyError';
import {configService} from '@/shared/services/ConfigService';
import {SurveyInfo} from '@/shared/api/survey/dto/SurveyInfo';

export class SurveyRemoteAPI implements SurveyAPI {
    public fetchSurveys(): Promise<Survey[]> {
        return new Promise<Survey[]>((resolve, reject) => {
            axios.get(
                `/surveys`,
                this.requestConfig
            ).then((response: AxiosResponse<Survey[]>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public fetchSurvey(surveyId: string): Promise<Survey> {
        return new Promise<Survey>((resolve, reject) => {
            axios.get(
                `/surveys/${surveyId}`,
                this.requestConfig
            ).then((response: AxiosResponse<Survey>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public fetchSurveyInfo(takeId: string): Promise<SurveyInfo> {
        return new Promise<SurveyInfo>((resolve, reject) => {
            axios.get(
                `/takes/${takeId}/survey`,
                this.requestConfig
            ).then((response: AxiosResponse<SurveyInfo>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public fetchTake(takeId: string): Promise<Take> {
        return new Promise<Take>((resolve, reject) => {
            axios.get(
                `/takes/${takeId}`,
                this.requestConfig
            ).then((response: AxiosResponse<Take>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public fetchTakes(surveyId: string): Promise<Take[]> {
        return new Promise<Take[]>((resolve, reject) => {
            axios.get(
                `/surveys/${surveyId}/takes`,
                this.requestConfig
            ).then((response: AxiosResponse<Take[]>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public takeSurvey(surveyId: string, user: User): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            axios.post(
                `/surveys/${surveyId}/take`,
                user,
                this.requestConfig
            ).then((response: AxiosResponse<string>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public resumeTake(takeId: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            axios.put(
                `/takes/${takeId}/resume`,
                undefined,
                this.requestConfig
            ).then((response: AxiosResponse<number>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public fetchQuestion(takeId: string, step: number): Promise<Question> {
        return new Promise<Question>((resolve, reject) => {
            axios.get(
                `/takes/${takeId}/question/${step}`,
                this.requestConfig
            ).then((response: AxiosResponse<Question>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public answerQuestion(takeId: string, questionId: string, answer: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            axios.post(
                `/takes/${takeId}/question/${questionId}`,
                answer,
                this.requestConfig
            ).then((response: AxiosResponse<void>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    public submitTake(takeId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            axios.post(
                `/takes/${takeId}/submit`,
                undefined,
                this.requestConfig
            ).then((response: AxiosResponse<void>) => {
                resolve(response.data);
            }).catch((error: AxiosError<SurveyError>) => {
                reject(this.handleAxiosError(error));
            });
        });
    }

    private handleAxiosError(error: AxiosError<SurveyError>): SurveyError {
        if (error.response) {
            // Request made and server responded
            return error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            return { message: "No response received" } as SurveyError;
        } else {
            // Something happened in setting up the request that triggered an Error
            return { message: error.message } as SurveyError;
        }
    }

    private get requestConfig(): AxiosRequestConfig {
        return {
            baseURL: configService.surveyBaseUrl
        };
    }
}

export const surveyRemoteAPI: SurveyAPI = new SurveyRemoteAPI();
