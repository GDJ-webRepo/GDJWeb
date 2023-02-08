import { Commentary } from "./comment.model";

export interface Article {
  id? : string;
  title? : string;
  previewText?: string;
  body? : string;
  imageUrl? : string;
  author? : string;
  actif? : boolean;
  date? : Date;
  imgName?: string;
  favoris?: Array<String>;
  comment?: Array<Commentary>;
}
