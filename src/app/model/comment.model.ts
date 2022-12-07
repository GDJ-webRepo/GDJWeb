
export interface Commentary {
    id? : string;
    userUid? : string;
    body? : string;
    author? : string;
    date? : Date;
    reponces?: Array<Commentary>;
}
  