import { Injectable, NgZone } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  deleteUser,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import {updateEmail} from "@firebase/auth";
import { User } from 'src/app/model/user';
import { UsersService } from '../user/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth)
  userData: any;
  constructor(private auth: Auth, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  forgotPassword(email: string): Observable<any>{
    return from(sendPasswordResetEmail(this.auth, email));
  }

  async GoogleAuth() {
    try {
      console.log("authservice google")
      const result =  await signInWithPopup(this.auth, new GoogleAuthProvider());
      console.log(result);
      const user = this.updateUserDate(result);
      return user;
  } catch (err: any) {
      throw new Error(err);
  }
   
    
  }

  updateUserDate(u: UserCredential):User {
   
        const newUser: User = {
            uid: u.user.uid,
            email: u.user.email!,
            displayName: u.user.displayName!,
            lastName: '',
            firstName:'',
            emailVerified: u.user.emailVerified,
            imgProfil: u.user.photoURL!,
            roles:{subscriber: true},
            auth:false,}
        return newUser;
}

  FacebookAuth(){
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  updateEmail(email: string){
    return from(updateEmail(this.userData, email))
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  deletUser(){
    return from(deleteUser(this.userData))
  }
}
