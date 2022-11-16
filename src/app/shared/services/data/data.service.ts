import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Article } from 'src/app/model/article';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  //add article
  addArticle(article : Article) {
    article.id = this.afs.createId();
    return this.afs.collection('/articles').add(article)
  }

  getAllArticles(){
    return this.afs.collection('/articles').snapshotChanges();
  }

  deleteArticle(article : Article){
    console.log(article.id);
    return this.afs.doc('/articles/'+article.id).delete();
  }

  //updateArticle(article : Article){
    //return this.afs.collection('/Articles').update
  //}
}
