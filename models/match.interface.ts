export enum MatchStatus {
    SCHEDULED = 'scheduled',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
}

export interface IMatch {
    _id: string;
    homeTeam: string;
    awayTeam: string;
    matchDate: Date;
    score: {
        home: number;
        away: number;
    };
    status: MatchStatus;
    stadium: string;
    referee: string;
    seasonId: string; 
}