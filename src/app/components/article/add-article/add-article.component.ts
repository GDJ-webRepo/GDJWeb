import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'firebase/auth';
import { switchMap } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { ImageUploadService } from 'src/app/shared/services/user/image-upload.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {


  isImageLoading = false;
  preview = '';
  file: any
  imgVerif = false
  constructor( private formBuilder: UntypedFormBuilder,
    private storage: AngularFireStorage,
    private dialog: MatDialog, private as: ArticleService,  private imageUploadService: ImageUploadService, private toast: HotToastService) { }

  ngOnInit(): void {
  }

  addArticleForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  get title(): AbstractControl | null {
    return this.addArticleForm.get('title');
  }

  get body(): AbstractControl | null {
    return this.addArticleForm.get('body');
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
        body: this.addArticleForm.get('body')?.value,
        date: new Date(),
        actif: true,
      };
      const filePath = `articleImg/${article.title}`;
      this.imageUploadService.uploadImage(this.file, filePath).pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
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
