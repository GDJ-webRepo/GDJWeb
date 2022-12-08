import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { AuthService } from '../auth/auth.service';
import {User} from "../../../model/user";
import { Commentary } from 'src/app/model/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  currentUser: any;
  articleRef: AngularFirestoreCollection<Article>;
  constructor(
    private db: Firestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private afs: AngularFirestore,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.articleRef = afs.collection('/articles');
    this.afAuth.authState.subscribe((user) => (this.currentUser = user!));
  }

  //Add Article
  addArticle(article: Article) {
    const articlesRef = collection(this.db, 'articles');
    article.id = doc(collection(this.db, 'articles')).id;
    article.date = new Date();
    return setDoc(doc(articlesRef, article.id), article);
  }

  //Get all articles from Firestore
  getArticles(): Observable<any> {
    return this.afs
      .collection<any>('articles', (ref) => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((item) => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        })
      );
  }

  getOneArticle(id: string): Observable<any> {
    return this.afs.collection<any>('articles', (ref) => ref.where('id',  '==', id )).snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((item) => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          };
        });
      })
    );
  }

  updateComment(article: Article, comment: Commentary[]){
    return this.articleRef.doc(article.id).update({ comment: comment});
  }

  //Delete Article
  deleteArticle(article: Article) {
    this.fireStorage.ref('articleImg/' + article.imgName).delete();
    let articleRef = doc(this.db, `articles/${article.id}`);
    return deleteDoc(articleRef).catch((error) => {
        alert(error.message);
    });
  }

  updateArticleImg(urlImg: string, imgName: string, articleID?: string): Promise<void> {
    return this.articleRef.doc(articleID).update({ imageUrl: urlImg, imgName: imgName });
  }

  updateArticleInfo(articleInfo: Article, articleID?: string): Promise<void> {
    return this.articleRef.doc(articleID).update(articleInfo);
  }
}

// // Create Article
// AddArticle(Article: Article) {
//   this.articlesRef.push({
//    Article
//   });
// }

// // Fetch Single Article Object
// GetArticle(id: string) {
//   this.articleRef = this.db.object('Articles-list/' + id);
//   return this.articleRef;
// }

// // Fetch Articles List
// GetArticlesList() {
//   this.articlesRef = this.db.list('Articles-list');
//   return this.articlesRef;
// }

// // Update Article Object
// UpdateArticle(Article: Article) {
//   this.articleRef.update({
//     Article
//   });
// }

// // Delete Article Object
// DeleteArticle(id: string) {
//   this.articleRef = this.db.object('Articles-list/' + id);
//   this.articleRef.remove();
// }
