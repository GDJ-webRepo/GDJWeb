import { FileMetaData } from "./file-meta-data";

export interface Article {
  id? : string;
  title? : string;
  body? : string;
  imageUrl? : string;
  author? : string;
  actif? : boolean;
  date? : Date;
  fileMeta? : {
    id: string,
    name: string,
    url: string,
    size: number,
  };
}
