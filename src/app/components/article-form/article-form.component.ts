import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'firebase/auth';
import { finalize } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { DataService } from 'src/app/shared/services/data/data.service';
import { FileService } from 'src/app/shared/services/file/file.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  selectedFiles!: FileList;
  currentFileUpload!: FileMetaData;
  percentage: number = 0;

  listOfFiles: FileMetaData[] = [];

  article: Article = {
    id: '',
    title: '',
    body: '',
    author: '',
    imageUrl: '',
    actif: true,
    date: new Date(),
  };

  user$ = this.usersService.currentUserProfile$;
  constructor(
    private articleService: ArticleService,
    public usersService: UsersService,
    private fileService: FileService,
    private fireStorage: AngularFireStorage,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  // createArticle(): void {
  //   this.user$.subscribe((user: User | any) => {
  //     this.article.author = user.displayName;
  //     this.articleService.create(this.article).then(() => {
  //       console.log('created new article');
  //     });
  //   });
  // }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  createArticle() {
    this.user$.subscribe((user: User | any) => {
      this.article.author = user.displayName;
      this.currentFileUpload = new FileMetaData(this.selectedFiles[0]);
      const path = 'articleImg/' + this.currentFileUpload.file.name;

      const storageRef = this.fireStorage.ref(path);
      const uploadTask = storageRef.put(this.selectedFiles[0]);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadLink) => {
              this.currentFileUpload.id = '';
              this.currentFileUpload.url = downloadLink;
              this.article.imageUrl = downloadLink.toString();
              this.articleService.create(this.article).then(() => {
                console.log('created new article');
              });
              this.currentFileUpload.size = this.currentFileUpload.file.size;
              this.currentFileUpload.name = this.currentFileUpload.file.name;
              this.fileService.saveMetaDataOfFile(this.currentFileUpload);
            });
            this.ngOnInit();
          })
        )
        .subscribe(
          (res: any) => {
            this.percentage = (res.bytesTransferred * 100) / res.totalBytes;
          },
          (err) => {
            console.log('Error occured');
          },
          () => {
           
          }
        );
    });
  }
}
