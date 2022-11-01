import { DatePipe } from '@angular/common';

export interface Article {
  id : string,
  title : string,
  body : string,
  author : string,
  actif : boolean,
  date : Date,
}
