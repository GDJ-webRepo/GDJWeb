import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './shared/services/auth/auth.service';
import { BlogComponent } from './components/blog/blog.component';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleComponent } from './components/article/article.component';
import { RdvComponent } from './components/rdv/rdv.component';
import { FaqComponent } from './components/faq/faq.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserProfilImgComponent } from './components/profile/user-profil-img/user-profil-img.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { EditFaqComponent } from './components/faq/edit-faq/edit-faq.component';
import { AddFaqComponent } from './components/faq/add-faq/add-faq.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ProfileComponent,
    UserProfilImgComponent,
    EditProfileComponent,
    NavBarComponent,
    BlogComponent,
    FooterComponent,
    ArticleComponent,
    RdvComponent,
    FaqComponent,
    NotFoundComponent,
    ArticleDetailComponent,
    EditArticleComponent,
    AddArticleComponent,
    EditFaqComponent,
    AddFaqComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbCarouselModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HotToastModule.forRoot(),
    MatMenuModule,
    EditorModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}