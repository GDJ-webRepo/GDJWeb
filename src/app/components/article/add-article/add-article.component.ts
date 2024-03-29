import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'firebase/auth';
import { AsyncSubject, Subject, switchMap } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { ImageUploadService } from 'src/app/shared/services/user/image-upload.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

 private editorSubject: Subject<any> = new AsyncSubject();
  isImageLoading = false;
  preview = '';
  file: any
  imgVerif = false
  constructor( @Inject(MAT_DIALOG_DATA)
               public data: {
    userData: User} , private formBuilder: UntypedFormBuilder,
    private storage: AngularFireStorage,
    private dialog: MatDialog, private as: ArticleService,  private imageUploadService: ImageUploadService, private toast: HotToastService) { }

  ngOnInit(): void {
  }

  addArticleForm = this.formBuilder.group({
    title: ['', Validators.required],
    previewText: ['', Validators.required],
    body: ['', Validators.required],
  });

  get title(): AbstractControl | null {
    return this.addArticleForm.get('title');
  }

  get previewText(): AbstractControl | null {
    return this.addArticleForm.get('previewText');
  }

  get body(): AbstractControl | null {
    return this.addArticleForm.get('body');
  }

  handleEditorInit(e: { editor: any; }) {
  this.editorSubject.next(e.editor);
  this.editorSubject.complete();
  }


  async selectFile(event: any): Promise<void> {
    if (event.target.files) {
      const file: File | null = event.target.files.item(0);

      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
          if (this.preview != '') {
            this.imgVerif = true
          }else{
            this.imgVerif = false
          }
        };
        reader.readAsDataURL(this.file);
      }
    }
  }

  onSubmit(): void {
    if (this.addArticleForm.valid) {
      const article: Article = {
        title: this.addArticleForm.get('title')?.value,
        previewText: this.addArticleForm.get('previewText')?.value,
        body: this.addArticleForm.get('body')?.value,
        comment: [],
        favoris: [],
        date: new Date(),
        author: this.data.userData.displayName!,
        actif: true,
        imgName: this.file.name
      };
      const filePath = `articleImg/${this.file.name}`;
      this.imageUploadService.uploadImage(this.file, filePath).pipe(
        this.toast.observe({
          loading: 'Uploading article image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((url) =>{
          return article.imageUrl = url,
            this.as.addArticle(article) }
        )
      ).subscribe();
      this.dialog.closeAll()
    }
  }

}
