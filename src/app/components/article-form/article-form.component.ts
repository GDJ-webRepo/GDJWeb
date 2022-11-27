import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'firebase/auth';
import { AsyncSubject, finalize, Observable, Subject } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { FileService } from 'src/app/shared/services/file/file.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  articleObj: Article = {
    id: '',
    title: '',
    body: '',
    imageUrl: '',
    author: '',
    actif: true,
    date: new Date(),
  };

  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  imageInfos?: Observable<any>;
  currentFileUpload!: FileMetaData;
  percentage: number = 0;

  articleForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private fileService: FileService,
    private fireStorage: AngularFireStorage
  ) {
    this.articleForm = fb.group({
      img: [null, Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
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
        this.articleForm.patchValue({
          img: file,
        });
        this.articleForm.get('img')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  addArticle() {
    const { value } = this.articleForm;
    console.log(value);
    (this.articleObj.title = value.title), (this.articleObj.body = value.body);
    this.currentFileUpload = new FileMetaData(this.selectedFiles![0]);
    const path = 'articleImg/' + this.currentFileUpload.file.name;
    this.fileService
      .pushFileToStorage(this.currentFileUpload, this.articleObj, false)
      .subscribe({
        next: (percentage: number) =>
          (this.percentage = Math.round(percentage ? percentage : 0)),
        error: (err: any) => console.error(err),
        complete: () => {
          this.articleForm.reset();
        },
      });
  }
}

// selectedFiles!: FileList;
// currentFileUpload!: FileMetaData;
// percentage: number = 0;

// listOfFiles: FileMetaData[] = [];

// article: Article = {
//   id: '',
//   title: '',
//   body: '',
//   author: '',
//   imageUrl: '',
//   actif: true,
//   date: new Date(),
// };

// private editorSubject: Subject<any> = new AsyncSubject();
// user$ = this.usersService.currentUserProfile$;
// public myForm!: FormGroup;

// constructor(
//   private articleService: ArticleService,
//   public usersService: UsersService,
//   private fileService: FileService,
//   private fireStorage: AngularFireStorage,
//   public fb : FormBuilder
// ) {}

// ngOnInit(): void {
//   this.articleService.GetArticlesList();
//   this.MyForm();
// }

// MyForm(){
//   this.myForm = this.fb.group({
//     title:['', Validators.required],
//     body:['', Validators.required]
//   })
// }

// get title(){
//   return this.myForm.get('title');
// }

// get body(){
//   return this.myForm.get('body')
// }

// ResetForm(){
//   this.myForm?.reset();
// }

// handleEditorInit(e: { editor: any; }) {
//   this.editorSubject.next(e.editor);
//   this.editorSubject.complete();
// }

// selectFile(event: any) {
//   this.selectedFiles = event.target.files;
// }

// createArticle() {
//   this.user$.subscribe((user: User | any) => {
//     this.article.author = user.displayName;
//     this.currentFileUpload = new FileMetaData(this.selectedFiles[0]);
//     const path = 'articleImg/' + this.currentFileUpload.file.name;

//     const storageRef = this.fireStorage.ref(path);
//     const uploadTask = storageRef.put(this.selectedFiles[0]);

//     uploadTask
//       .snapshotChanges()
//       .pipe(
//         finalize(() => {
//           storageRef.getDownloadURL().subscribe((downloadLink) => {
//             this.currentFileUpload.id = '';
//             this.currentFileUpload.url = downloadLink;
//             this.article.imageUrl = downloadLink.toString();
//             this.article.title = this.title
//             this.articleService.AddArticle(this.article)
//             this.currentFileUpload.size = this.currentFileUpload.file.size;
//             this.currentFileUpload.name = this.currentFileUpload.file.name;
//             this.fileService.saveMetaDataOfFile(this.currentFileUpload);
//           });
//           this.ngOnInit();
//         })
//       )
//       .subscribe(
//         (res: any) => {
//           this.percentage = (res.bytesTransferred * 100) / res.totalBytes;
//         },
//         (err) => {
//           console.log('Error occured');
//         },
//         () => {

//         }
//       );
//   });
// }
