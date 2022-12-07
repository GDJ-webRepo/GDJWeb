import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { User } from 'src/app/model/user';
import { HotToastService, Toast } from '@ngneat/hot-toast';
import { UsersService } from '../user/users.service';
import { user } from 'rxfire/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userCollection: AngularFirestoreCollection<User>;
  currentUser$ = authState(this.auth);
  userData: any; // Save logged in user data
  constructor(
    private auth: Auth,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private toast: HotToastService,
    private fireStorage: AngularFireStorage
  ) {
    this.userCollection = this.afs.collection('users');
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
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
  // Sign in with email/password
  Login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.toast.show('Vous êtes connecté 👍');
            this.router.navigate(['accueil']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, displayName);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.toast.show('Un email de vérification vous a été envoyé 📬');
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verification-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Un email de réinitialisation a été envoyé.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['accueil']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['accueil']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any, displayName='') {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: displayName != '' ? displayName : user.displayName,
      imgProfil: user.photoURL != '' ? user.photoURL: '',
      firstName: '',
      lastName: '', 
      auth: displayName === '' ? false : true,
      roles: {subscriber: true} 
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['accueil']);
    });
  }
  deletUser(user: User){
    this.afAuth.currentUser.then(user => user?.delete()).then(() => {
      localStorage.removeItem('user');
      this.userCollection.doc(user.uid).delete();
      this.fireStorage.ref('profilImage/' + user.uid).delete();
      this.router.navigate(['accueil']);
    }).catch((error)=> {
      window.alert(error)
    });
  }
  updateEmail(email:string){
    return this.afAuth.currentUser.then(user => user?.updateEmail(email))
  }
}