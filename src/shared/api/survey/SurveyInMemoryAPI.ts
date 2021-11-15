import {SurveyAPI} from '@/shared/api/survey/SurveyAPI';
import {Question, TakeQuestionType} from '@/shared/api/survey/dto/Question';
import {Survey} from '@/shared/api/survey/dto/Survey';
import {Take} from '@/shared/api/survey/dto/Take';
import {User} from '@/shared/api/survey/dto/User';
import {SurveyInfo} from '@/shared/api/survey/dto/SurveyInfo';
import {SurveyError} from '@/shared/api/survey/dto/SurveyError';

export class SurveyInMemoryAPI implements SurveyAPI {
    private surveyId: number = 0;
    private takeId: number = 0;
    private surveys: any[];

    public constructor() {
        this.surveys = [
            {
                "id": this.allocateSurveyId(),
                "name": "Customer Satisfaction Survey Template",
                "questions": [
                    {
                        "qid": "COMPANY_RECOMMEND",
                        "text": "How likely is it that you would recommend this company to a friend or colleague?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "NOT_AT_ALL", "text": "Not at all likely", "score": -2 },
                            { "oid": "VERY_LITTLE", "text": "Very little likely", "score": -1 },
                            { "oid": "SOMEWHAT", "text": "Somewhat likely", "score": 0 },
                            { "oid": "EXTREMELY", "text": "Extremely likely", "score": 1 }
                        ]
                    },
                    {
                        "qid": "COMPANY_SATISFACTION",
                        "text": "Overall, how satisfied or dissatisfied are you with our company?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Very satisfied", "score": 2 },
                            { "oid": "SOMEWHAT_POSITIVE", "text": "Somewhat satisfied", "score": 1 },
                            { "oid": "NEUTRAL", "text": "Neither satisfied nor dissatisfied", "score": 0 },
                            { "oid": "SOMEWHAT_NEGATIVE", "text": "Somewhat dissatisfied", "score": -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Very dissatisfied", "score": -2 }
                        ]
                    },
                    {
                        "qid": "PRODUCTS_WORDS",
                        "text": "Which of the following words would you use to describe our products? Select all that apply.",
                        "type": "MULTIPLE_CHOICE",
                        "options": [
                            { "oid": "RELIABLE", "text": "Reliable", "score": 1 },
                            { "oid": "HIGH", "text": "High quality", "score": 1 },
                            { "oid": "USEFUL", "text": "Useful", "score": 1 },
                            { "oid": "UNIQUE", "text": "Unique", "score": 2 },
                            { "oid": "GOOD", "text": "Good value for money", "score": 1 },
                            { "oid": "OVERPRICED", "text": "Overpriced", "score": -1 },
                            { "oid": "IMPRACTICAL", "text": "Impractical", "score": -2 },
                            { "oid": "INEFFECTIVE", "text": "Ineffective", "score": -2 },
                            { "oid": "POOR", "text": "Poor quality", "score": -2 },
                            { "oid": "UNRELIABLE", "text": "Unreliable", "score": -2 }
                        ]
                    },
                    {
                        "qid": "PRODUCTS_NEEDS",
                        "text": "How well do our products meet your needs?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Extremely well", "score": 2 },
                            { "oid": "POSITIVE", "text": "Very well", "score":  1 },
                            { "oid": "NEUTRAL", "text": "Somewhat well", "score":  0 },
                            { "oid": "NEGATIVE", "text": "Not so well", "score":  -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Not at all well", "score":  -2 }
                        ]
                    },
                    {
                        "qid": "PRODUCTS_QUALITY",
                        "text": "How would you rate the quality of the product?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Very high quality", "score": 2 },
                            { "oid": "POSITIVE", "text": "High quality", "score":  1 },
                            { "oid": "NEUTRAL", "text": "Neither high nor low quality", "score":  0 },
                            { "oid": "NEGATIVE", "text": "Low quality", "score":  -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Very low quality", "score":  -2 }
                        ]
                    },
                    {
                        "qid": "PRODUCTS_VFM",
                        "text": "How would you rate the value for money of the product?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Excellent", "score": 2 },
                            { "oid": "POSITIVE", "text": "Above average", "score":  1 },
                            { "oid": "NEUTRAL", "text": "Average", "score":  0 },
                            { "oid": "NEGATIVE", "text": "Below average", "score":  -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Poor", "score":  -2 }
                        ]
                    },
                    {
                        "qid": "RESPONSIVENESS",
                        "text": "How responsive have we been to your questions or concerns about our products?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Extremely responsive", "score": 2 },
                            { "oid": "POSITIVE", "text": "Very responsive", "score": 1 },
                            { "oid": "NEUTRAL", "text": "Somewhat responsive", "score": 0 },
                            { "oid": "NEGATIVE", "text": "Not so responsive", "score": -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Not at all responsive", "score": -2 },
                            { "oid": "UNKNOWN", "text": "Not applicable", "score": 0 }
                        ]
                    },
                    {
                        "qid": "CUSTOMER_LONG",
                        "text": "How long have you been a customer of our company?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "FIRST", "text": "This is my first purchase", "score": 1 },
                            { "oid": "HALF_YEAR", "text": "Less than six months", "score": 2 },
                            { "oid": "YEAR", "text": "Six months to a year", "score": 3 },
                            { "oid": "TWO_YEARS", "text": "1 - 2 years", "score": 4 },
                            { "oid": "THREE_YEARS", "text": "3 or more years", "score": 5 },
                            { "oid": "NONE", "text": "I haven't made a purchase yet", "score": 0 }
                        ]
                    },
                    {
                        "qid": "PURCHASE_AGAIN",
                        "text": "How likely are you to purchase any of our products again?",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Extremely likely", "score": 2 },
                            { "oid": "POSITIVE", "text": "Very likely", "score": 1 },
                            { "oid": "NEUTRAL", "text": "Somewhat likely", "score": 0 },
                            { "oid": "NEGATIVE", "text": "Not so likely", "score": -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Not at all likely", "score": -2 }
                        ]
                    },
                    {
                        "qid": "COMMENTS",
                        "text": "Do you have any other comments, questions, or concerns?",
                        "type": "FREETEXT",
                        "options": [
                        ]
                    }
                ],
                "takes": [
                    {
                        "tid": this.allocateTakeId(),
                        "user": {
                            "name": "Joe",
                            "surname": "Angry",
                            "age": 34,
                            "email": null
                        },
                        "score": -20,
                        "startedDateTime": "2020-03-20T14:30:43",
                        "completedDateTime": "2020-03-20T14:30:43",
                        "answers": [
                            { "questionId": "COMPANY_RECOMMEND", "answer": [ "NOT_AT_ALL" ] },
                            { "questionId": "COMPANY_SATISFACTION", "answer": [ "VERY_NEGATIVE" ] },
                            { "questionId": "PRODUCTS_WORDS", "answer": [ "UNRELIABLE", "OVERPRICED", "INEFFECTIVE" ] },
                            { "questionId": "PRODUCTS_NEEDS", "answer": [ "VERY_NEGATIVE" ] },
                            { "questionId": "PRODUCTS_QUALITY", "answer": [ "VERY_NEGATIVE" ] },
                            { "questionId": "PRODUCTS_VFM", "answer": [ "VERY_NEGATIVE" ] },
                            { "questionId": "RESPONSIVENESS", "answer": [ "UNKNOWN" ] },
                            { "questionId": "CUSTOMER_LONG", "answer": [ "FIRST" ] },
                            { "questionId": "PURCHASE_AGAIN", "answer": [ "VERY_NEGATIVE" ] },
                            { "questionId": "COMMENTS", "answer": [ "Never gonna buy anything from this store anymore" ] }
                        ]
                    },
                    {
                        "tid": this.allocateTakeId(),
                        "user": {
                            "name": "Mark",
                            "surname": "Gates",
                            "age": 22,
                            "email": "mark.gates@emailfake.com"
                        },
                        "score": 20,
                        "startedDateTime": "2020-03-20T14:30:43",
                        "completedDateTime": "2020-03-20T14:30:43",
                        "answers": [
                            { "questionId": "COMPANY_RECOMMEND", "answer": [ "EXTREMELY" ] },
                            { "questionId": "COMPANY_SATISFACTION", "answer": [ "VERY_POSITIVE" ] },
                            { "questionId": "PRODUCTS_WORDS", "answer": [ "RELIABLE", "USEFUL", "GOOD" ] },
                            { "questionId": "PRODUCTS_NEEDS", "answer": [ "VERY_POSITIVE" ] },
                            { "questionId": "PRODUCTS_QUALITY", "answer": [ "VERY_POSITIVE" ] },
                            { "questionId": "PRODUCTS_VFM", "answer": [ "VERY_POSITIVE" ] },
                            { "questionId": "RESPONSIVENESS", "answer": [ "POSITIVE" ] },
                            { "questionId": "CUSTOMER_LONG", "answer": [ "HALF_YEAR" ] },
                            { "questionId": "PURCHASE_AGAIN", "answer": [ "VERY_POSITIVE" ] },
                            { "questionId": "COMMENTS", "answer": [ "Very good store!" ] }
                        ]
                    },
                    {
                        "tid": this.allocateTakeId(),
                        "user": {
                            "name": "Josh",
                            "surname": "Greenwald",
                            "age": 58,
                            "email": "josh.greenwald@emailfake.com"
                        },
                        "score": null,
                        "startedDateTime": "2020-03-20T14:30:43",
                        "completedDateTime": null,
                        "answers": [
                            { "questionId": "COMPANY_RECOMMEND", "answer": [ "SOMEWHAT" ] },
                            { "questionId": "COMPANY_SATISFACTION", "answer": [ "NEUTRAL" ] },
                            { "questionId": "PRODUCTS_WORDS", "answer": [ "GOOD", "OVERPRICED" ] }
                        ]
                    }
                ]
            },
            {
                "id": this.allocateSurveyId(),
                "name": "Test survey",
                "questions": [
                    {
                        "qid": "Q_FREETEXT",
                        "text": "This is a free text question",
                        "type": "FREETEXT",
                        "options": [
                        ]
                    },
                    {
                        "qid": "Q_DATE",
                        "text": "This is a date question",
                        "type": "DATE",
                        "options": [
                        ]
                    },
                    {
                        "qid": "Q_SCHOICE",
                        "text": "This is single choice question",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Extremely likely", "score": 2 },
                            { "oid": "POSITIVE", "text": "Very likely", "score": 1 },
                            { "oid": "NEUTRAL", "text": "Somewhat likely", "score": 0 },
                            { "oid": "NEGATIVE", "text": "Not so likely", "score": -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Not at all likely", "score": -2 }
                        ]
                    },
                    {
                        "qid": "Q_MCHOICE",
                        "text": "This is multiple choice question",
                        "type": "MULTIPLE_CHOICE",
                        "options": [
                            { "oid": "RELIABLE", "text": "Reliable", "score": 1 },
                            { "oid": "HIGH", "text": "High quality", "score": 1 },
                            { "oid": "USEFUL", "text": "Useful", "score": 1 },
                            { "oid": "UNIQUE", "text": "Unique", "score": 2 },
                            { "oid": "GOOD", "text": "Good value for money", "score": 1 },
                            { "oid": "OVERPRICED", "text": "Overpriced", "score": -1 },
                            { "oid": "IMPRACTICAL", "text": "Impractical", "score": -2 },
                            { "oid": "INEFFECTIVE", "text": "Ineffective", "score": -2 },
                            { "oid": "POOR", "text": "Poor quality", "score": -2 },
                            { "oid": "UNRELIABLE", "text": "Unreliable", "score": -2 }
                        ]
                    }
                ],
                "takes": [
                ]
            },
            {
                "id": this.allocateSurveyId(),
                "name": "Java Persistence Architecture",
                "questions": [
                    {
                        "qid": "Q_FREETEXT",
                        "text": "This is a free text question",
                        "type": "FREETEXT",
                        "options": [
                        ]
                    },
                    {
                        "qid": "Q_DATE",
                        "text": "This is a date question",
                        "type": "DATE",
                        "options": [
                        ]
                    },
                    {
                        "qid": "Q_SCHOICE",
                        "text": "This is single choice question",
                        "type": "SINGLE_CHOICE",
                        "options": [
                            { "oid": "VERY_POSITIVE", "text": "Extremely likely", "score": 2 },
                            { "oid": "POSITIVE", "text": "Very likely", "score": 1 },
                            { "oid": "NEUTRAL", "text": "Somewhat likely", "score": 0 },
                            { "oid": "NEGATIVE", "text": "Not so likely", "score": -1 },
                            { "oid": "VERY_NEGATIVE", "text": "Not at all likely", "score": -2 }
                        ]
                    },
                    {
                        "qid": "Q_MCHOICE",
                        "text": "This is multiple choice question",
                        "type": "MULTIPLE_CHOICE",
                        "options": [
                            { "oid": "RELIABLE", "text": "Reliable", "score": 1 },
                            { "oid": "HIGH", "text": "High quality", "score": 1 },
                            { "oid": "USEFUL", "text": "Useful", "score": 1 },
                            { "oid": "UNIQUE", "text": "Unique", "score": 2 },
                            { "oid": "GOOD", "text": "Good value for money", "score": 1 },
                            { "oid": "OVERPRICED", "text": "Overpriced", "score": -1 },
                            { "oid": "IMPRACTICAL", "text": "Impractical", "score": -2 },
                            { "oid": "INEFFECTIVE", "text": "Ineffective", "score": -2 },
                            { "oid": "POOR", "text": "Poor quality", "score": -2 },
                            { "oid": "UNRELIABLE", "text": "Unreliable", "score": -2 }
                        ]
                    }
                ],
                "takes": [
                ]
            }
        ];
    }

    public randomFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    public randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        // The maximum is inclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public allocateSurveyId(): string {
        this.surveyId++;
        return `${this.surveyId}`;
    }

    public allocateTakeId(): string {
        this.takeId++;
        return `${this.takeId}`;
    }

    public fetchSurveys(): Promise<Survey[]> {
        return new Promise<Survey[]>((resolve, reject) => {
            resolve(
                this.surveys.map(x => ({
                    id: x.id,
                    name: x.name,
                    steps: x.questions.length,
                    avgScore: this.randomFloat(0, 10),
                    maxScore: 10,
                    completedCount: x.takes.filter((take: any) => take.score !== null).length,
                    uncompletedCount: x.takes.filter((take: any) => take.score === null).length
                }) as Survey)
            );
        });
    }

    public fetchSurvey(surveyId: string): Promise<Survey> {
        return new Promise<Survey>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.id === surveyId);
            if (survey !== undefined) {
                resolve({
                    id: survey.id,
                    name: survey.name,
                    steps: survey.questions.length,
                    avgScore: this.randomFloat(0, 10),
                    maxScore: 10,
                    completedCount: survey.takes.filter((take: any) => take.score !== null).length,
                    uncompletedCount: survey.takes.filter((take: any) => take.score === null).length
                } as Survey);
            } else {
                reject({
                    message: `Could not find survey with id ${surveyId}`
                } as SurveyError);
            }
        });
    }

    public fetchSurveyInfo(takeId: string): Promise<SurveyInfo> {
        return new Promise<SurveyInfo>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                resolve({
                    id: survey.id,
                    name: survey.name,
                    steps: survey.questions.length
                } as SurveyInfo);
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }

    public fetchTake(takeId: string): Promise<Take> {
        return new Promise<Take>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                const take: any = survey.takes.find((y: any) => y.tid === takeId);
                resolve({
                    id: take.tid,
                    user: { ...take.user },
                    score: take.score,
                    startedDateTime: take.startedDateTime,
                    completedDateTime: take.completedDateTime,
                    maxScore: this.randomFloat(5, 10)
                } as Take);
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }

    public fetchTakes(surveyId: string): Promise<Take[]> {
        return new Promise<Take[]>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.id === surveyId);
            if (survey !== undefined) {
                resolve(
                    survey.takes.map((take: any) => ({
                        id: take.tid,
                        user: { ...take.user },
                        score: take.score,
                        startedDateTime: take.startedDateTime,
                        completedDateTime: take.completedDateTime,
                        maxScore: null
                    } as Take))
                );
            } else {
                reject({
                    message: `Could not find survey with id ${surveyId}`
                } as SurveyError);
            }
        });
    }

    public takeSurvey(surveyId: string, user: User): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.id === surveyId);
            if (survey !== undefined) {
                const take: any = {
                    tid: this.allocateTakeId(),
                    user: {...user},
                    score: null,
                    startedDateTime: new Date().toISOString(),
                    completedDateTime: null,
                    answers: []
                };
                survey.takes.push(take);
                resolve(take.tid);
            } else {
                reject({
                    message: `Could not find survey with id ${surveyId}`
                } as SurveyError);
            }
        });
    }

    public resumeTake(takeId: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                const take: any = survey.takes.find((y: any) => y.tid === takeId);
                for (let i = 0; i < survey.questions.length; i++) {
                    if (take.answers.find((x: any) => x.questionId === survey.questions[i].qid) === undefined) {
                        resolve(i + 1);
                    }
                }

                reject({
                    message: `Survey is completed`
                } as SurveyError);
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }

    public fetchQuestion(takeId: string, step: number): Promise<Question> {
        return new Promise<Question>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                const take: any = survey.takes.find((y: any) => y.tid === takeId);
                const question: any = survey.questions[step - 1];
                const takeAnswer: any = take.answers.find((x: any) => x.questionId === question.qid);
                resolve({
                    id: question.qid,
                    text: question.text,
                    type: question.type,
                    options: question.options.map((option: any) => ({
                       id: option.oid,
                       text: option.text,
                       score: null
                    })),
                    answer: takeAnswer !== undefined ? takeAnswer.answer : []
                } as Question);
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }

    public answerQuestion(takeId: string, questionId: string, answer: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                const take: any = survey.takes.find((y: any) => y.tid === takeId);
                const question: any = survey.questions.find((x: any) => x.qid === questionId);
                const takeAnswer: any = take.answers.find((x: any) => x.questionId === question.qid);
                if (takeAnswer === undefined) {
                    take.answers.push({
                        questionId: question.qid,
                        answer: [ ...answer ]
                    });
                } else {
                    takeAnswer.answer = [...answer];
                }
                resolve();
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }

    public submitTake(takeId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const survey: any = this.surveys.find(x => x.takes.find((y: any) => y.tid === takeId) !== undefined);
            if (survey !== undefined) {
                const take: any = survey.takes.find((y: any) => y.tid === takeId);
                take.score = this.randomFloat(0, 10);
                take.completedDateTime = new Date().toISOString();
                resolve();
            } else {
                reject({
                    message: `Could not find take with id ${takeId}`
                } as SurveyError);
            }
        });
    }
}

export const surveyInMemoryAPI: SurveyAPI = new SurveyInMemoryAPI();
