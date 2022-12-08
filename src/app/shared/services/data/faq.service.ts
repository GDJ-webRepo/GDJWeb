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
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FAQ } from 'src/app/model/faq.model';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  currentUser: any;
  articleRef: AngularFirestoreCollection<FAQ>;
  constructor(
    private db: Firestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private afs: AngularFirestore,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.articleRef = afs.collection('/faqs');
    this.afAuth.authState.subscribe((user) => (this.currentUser = user!));
  }

  //Add Article
  addFaq(faq: FAQ) {
    const articlesRef = collection(this.db, 'faqs');
    faq.id = doc(collection(this.db, 'faqs')).id;
    faq.date = new Date();
    return setDoc(doc(articlesRef, faq.id), faq);
  }

  //Get all articles from Firestore
  getAllFaq(): Observable<any> {
    return this.afs
      .collection<any>('faqs', (ref) => ref.orderBy('date', 'desc'))
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

  //Delete Article
  deleteFaq(faq: FAQ) {
    let articleRef = doc(this.db, `faqs/${faq.id}`);
    return deleteDoc(articleRef).catch((error) => {
      alert(error.message);
    });
  }

  updateFaqInfo(faqInfo: FAQ, faqID?: string): Promise<void> {
    return this.articleRef.doc(faqID).update(faqInfo);
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
