export interface Match {
    id: string;
    location: string;
    time: Date;
    type: '5v5' | '7v7' | '11v11';
    players: string[];
  }
  