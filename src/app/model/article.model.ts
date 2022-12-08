import { Commentary } from "./comment.model";

export interface Article {
  id? : string;
  title? : string;
  body? : string;
  imageUrl? : string;
  author? : string;
  actif? : boolean;
  date? : Date;
  imgName?: string;
  comment?: Array<Commentary>;
}
