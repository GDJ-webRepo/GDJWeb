import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { finalize, Observable } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from '../data/articles.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private storage: AngularFireStorage,
    private articleService: ArticleService
  ) {}

  private basePath = '/articleImg';

  pushFileToStorage(
    fileUpload: FileMetaData,
    articleObj: Article,
    article: Article,
    update: boolean
  ): Observable<number> | any {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            fileUpload.id = '';
            fileUpload.size = fileUpload.file.size;
            this.saveMetaDataOfFile(fileUpload);
            articleObj.imageUrl = downloadURL;
            if (!update) {
              this.articleService.addArticle(articleObj)
            }else{
              this.articleService.updateArticle(article, articleObj)
            }
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  // save meta data of file to firestore
  saveMetaDataOfFile(fileObj: FileMetaData) {
    const fileMeta = {
      id: '',
      name: fileObj.name,
      url: fileObj.url,
      size: fileObj.size,
    };

    fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('/articleImg').add(fileMeta);
  }

  // dislpay all files
  getAllFiles() {
    return this.fireStore.collection('/articleImg').snapshotChanges();
  }

  // delete file
  deleteFile(fileMeta: FileMetaData) {
    this.fireStore.collection('/articleImg').doc(fileMeta.id).delete();
    this.fireStorage.ref('/articleImg/' + fileMeta.name).delete();
  }
}
