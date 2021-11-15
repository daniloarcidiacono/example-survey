export enum TakeQuestionType {
    FREETEXT = 'FREETEXT',
    DATE = 'DATE',
    SINGLE_CHOICE = 'SINGLE_CHOICE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export interface Question {
    id: string;
    text: string;
    type: TakeQuestionType;
    options: Array<{
        id: string;
        text: string;
        score: number | null;
    }>;

    answer: string[];
}
