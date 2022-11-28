import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { RdvComponent } from './components/rdv/rdv.component';
import { FaqComponent } from './components/faq/faq.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
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
    path: 'profile',
    component: ProfileComponent,

    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'rdv',
    component: RdvComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
