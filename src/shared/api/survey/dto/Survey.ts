export interface Survey {
    id: string;
    name: string;
    steps: number;
    avgScore: number | null;
    maxScore: number;
    completedCount: number;
    uncompletedCount: number;
}
