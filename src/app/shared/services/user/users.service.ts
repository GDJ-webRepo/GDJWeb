import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute, Route } from '@angular/router';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../../model/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore, private authService: AuthService,private firestore: Firestore, private fireStorage: AngularFireStorage) {
    this.userCollection = this.afs.collection('users');
  }

  getUser = (userid?: string) => this.userCollection.doc(userid).valueChanges();

  get currentUserProfile$(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }


  // Sauvegade des données de nouveau utilisateur dans firestore
  newUser(user: User): Promise<void> {
    const userDoc = this.userCollection.doc(`${user.uid}`);
    return userDoc.set(user);
  }

  deleteUser(user: User){
    this.authService.deletUser();
    this.fireStorage.ref('profilImage/' + user.uid).delete();
    this.userCollection.doc(user.uid).delete();
  }

  updateUserProfileImg(urlImg: string, userID?: string): Promise<void> {
    return this.userCollection.doc(userID).update({ imgProfil: urlImg });
  }

  async updateUserProfilInfo(userInfo: User, userID?: string): Promise<void> {
    await this.authService.updateEmail(userInfo.email!)
    return this.userCollection.doc(userID).update(userInfo);
  }


}
