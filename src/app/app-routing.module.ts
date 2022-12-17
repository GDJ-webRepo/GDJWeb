import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { RdvComponent } from './components/rdv/rdv.component';
import { FaqComponent } from './components/faq/faq.component';
import {
  AuthGuardModule,
  canActivate,
  emailVerified,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ConditionsUtilisationComponent } from './components/conditions-utilisation/conditions-utilisation.component';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['connexion']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['accueil']);

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://guidedesjeunes.com', 
  },
  palette: {
    popup: {
      text:"black",
      background: 'white'
    },
    button: {
      background: '#bde0d5'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'connexion',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'inscription',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome}
  },
  {
    path: 'mot-de-passe-oublié',
    component: ForgotPasswordComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome}
  },
  { path: 'verification-email', component: VerifyEmailComponent},
  {
    path: 'accueil',
    component: HomeComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'detail/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'profil',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}
    // ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'rdv',
    component: RdvComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path:'conditions-utilisation',
    component:ConditionsUtilisationComponent
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),NgcCookieConsentModule.forRoot(cookieConfig),],
  exports: [RouterModule],
})


export class AppRoutingModule {}
