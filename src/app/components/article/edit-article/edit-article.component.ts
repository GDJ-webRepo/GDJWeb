import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {User} from "../../../model/user";
import {AbstractControl, UntypedFormBuilder, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ImageUploadService} from "../../../shared/services/user/image-upload.service";
import {UsersService} from "../../../shared/services/user/users.service";
import {HotToastService} from "@ngneat/hot-toast";
import {AsyncSubject, Subject, switchMap} from "rxjs";
import {Article} from "../../../model/article.model";
import {ArticleService} from "../../../shared/services/data/articles.service";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {


 private editorSubject: Subject<any> = new AsyncSubject();
  isImageLoading = false;
  preview = '';
  file: any
  imgVerif = false
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userData: User;
      articleData: Article
    },
    private formBuilder: UntypedFormBuilder,
    private storage: AngularFireStorage,
    private imageUploadService: ImageUploadService,
    private us: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private as: ArticleService
  ) {}

  ngOnInit(): void {
    this.preview = this.data.articleData.imageUrl!;
  }

  editArticleForm = this.formBuilder.group({
    title: [this.data.articleData.title, Validators.required],
    previewText: [this.data.articleData.previewText, Validators.required],
    body: [this.data.articleData.body, Validators.required],
  });

  get title(): AbstractControl | null {
    return this.editArticleForm.get('title');
  }

  get previewText(): AbstractControl | null {
    return this.editArticleForm.get('previewText');
  }

  get body(): AbstractControl | null {
    return this.editArticleForm.get('body');
  }

  handleEditorInit(e: { editor: any; }) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
    }

  async selectFile(event: any): Promise<void> {
    if (event.target.files) {
      this.isImageLoading = true;

      for (let i = 0; i < File.length; i++) {
        const file = event.target.files[i];
        const filePath = `articleImg/${this.data.articleData.imgName}`;
        this.imageUploadService.uploadImage(file, filePath).pipe(
          this.toast.observe({
            loading: 'Updating article image...',
            success: 'Image uploaded successfully',
            error: 'There was an error in uploading the image',
          }),
          switchMap((url) =>{
            this.as.updateArticleImg(url, this.data.articleData.imgName! ,this.data.articleData.id)
            return this.preview = url
          }
          )
        ).subscribe();
        this.isImageLoading = false;

      }
    }
  }



  onSubmit(): void {
    if (this.editArticleForm.valid) {
      const articleInfo: Article = {
        id: this.data.articleData.id,
        title: this.editArticleForm.get('title')?.value,
      previewText: this.editArticleForm.get('previewText')?.value,
        body: this.editArticleForm.get('body')?.value,
        author: this.data.userData.displayName!,
      };

      this.as.updateArticleInfo(articleInfo, this.data.articleData.id);
      this.dialog.closeAll();
    }
  }


}
