import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { FileService } from 'src/app/shared/services/file/file.service';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss'],
})
export class ArticleUpdateComponent implements OnInit {
  @Input() article: Article = {};

  articleObj: Article = {
    id: '',
    title: '',
    body: '',
    imageUrl: '',
    author: '',
    actif: true,
    fileMeta: {
      id:'',
      name:'',
      url:'',
      size:0
    },
    date: new Date(),
  };

  articleDetails: any;
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  imageInfos?: Observable<any>;
  currentFileUpload!: FileMetaData;
  percentage: number = 0;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private fileService: FileService,
    private fireStorage: AngularFireStorage
  ) {
    this.editForm = fb.group({
      edit_img: [null],
      edit_title: [''],
      edit_body: [''],
    });
  }
  ngOnInit(): void {}

  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        this.editForm.patchValue({
          img: file,
        });
        this.editForm.get('img')?.updateValueAndValidity();
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  getAllDetails() {
    console.log('get all details' );
    console.log(this.article);
    this.articleDetails = this.article;
    this.editForm.controls['edit_title'].setValue(this.article.title);
    this.editForm.controls['edit_body'].setValue(this.article.body);
    this.preview = this.article.imageUrl!;
  }

  updateArticle() {
    const { value } = this.editForm;
    this.articleObj.id = this.article.id;
    this.articleObj.title = value.edit_title;
    this.articleObj.body = value.edit_body;
    this.articleObj.author = this.article.author
    console.log("obj update + value")
    console.log(value)
    console.log(this.articleObj)
    if (this.selectedFiles) {
      console.log("update avec img")
      this.currentFileUpload = new FileMetaData(this.selectedFiles![0]);
      const path = 'articleImg/' + this.currentFileUpload.file.name;
      this.fileService
        .pushFileToStorage(
          this.currentFileUpload,
          this.articleObj,
          true
        )
        .subscribe({
          next: (percentage: number) =>
            (this.percentage = Math.round(percentage ? percentage : 0)),
          error: (err: any) => console.error(err),
          complete: () => {
            this.reset();
          },
        });
    } else {
      console.log("update sans img")
      this.articleObj.imageUrl= this.article.imageUrl
      this.articleObj.fileMeta = this.article.fileMeta
      this.articleService.updateArticle( this.articleObj)
      this.reset();
    }
  }


  reset(){
    this.articleObj ={
      id: '',
      title: '',
      body: '',
      imageUrl: '',
      author: '',
      actif: true,
      fileMeta: {
        id:'',
        name:'',
        url:'',
        size:0
      },
      date: new Date(),
    };
    this.editForm.reset();
    this.percentage = 0;
  
  }
}


// const { value } = this.editForm;
// this.articleObj.id = this.article.id;
// this.articleObj.title = value.edit_title;
// this.articleObj.body = value.edit_body;
// console.log("obj update + value")
// console.log(value)
// console.log(this.articleObj)
// if (this.selectedFiles) {
//   console.log("update avec img")
//   this.currentFileUpload = new FileMetaData(this.selectedFiles![0]);
//   const path = 'articleImg/' + this.currentFileUpload.file.name;
//   this.fileService
//     .pushFileToStorage(
//       this.currentFileUpload,
//       this.articleObj,
//       true
//     )
//     .subscribe({
//       next: (percentage: number) =>
//         (this.percentage = Math.round(percentage ? percentage : 0)),
//       error: (err: any) => console.error(err),
//       complete: () => {
//         // alert("L'article à bien été ajouté");
//         this.editForm.reset();
//       },
//     });
// } else {
//   console.log("update sans img")
//   this.articleObj.fileMeta = this.article.fileMeta
//   this.articleService.updateArticle( this.articleObj)
// }