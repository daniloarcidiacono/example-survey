import {User} from '@/shared/api/survey/dto/User';

export interface Take {
    id: string;
    user: User;
    score: number | null;
    startedDateTime: string;
    completedDateTime: string | null;

    // Maximum attainable score. Populated only when requesting
    // a specific take.
    maxScore: number | null;
}
