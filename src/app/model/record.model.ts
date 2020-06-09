
export type Records = Record[];

export type Wrapups = Wrapup[];

export class Wrapup {
    wrapupId: number;
    agentId: number;
    wrapupComment: string;
}

export class Record {
    
    channel: string;
    startedAt:string; // date-time
    finishedAt: string; // date-time
    durationInMs: number;
    contactPhone: string; // 790...
    displayedNumber: string; // 790...

    sessionId: string; // uuid
    wrapups: Wrapups;

    userId: number;
    id: number;

}