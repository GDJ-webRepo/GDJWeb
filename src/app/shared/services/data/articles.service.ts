import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Article } from 'src/app/model/article.model';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private dbPath = '/articles'

  articlesRef: AngularFirestoreCollection<Article>;
  constructor(private db : AngularFirestore) {
    this.articlesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Article>{
    return this.articlesRef;
  }

  create(article : Article) {
    article.id = this.db.createId();
    return this.db.collection('/articles').add(article);
  }

  update(id: string, data: any): Promise<void> {
    return this.articlesRef.doc(id).update(data);
  }

  delete(id : string){
    return this.articlesRef.doc(id).delete();
  }

  //updateArticle(article : Article){
    //return this.afs.collection('/Articles').update
  //}
}
