import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { Commentary } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  editDialogRef!: MatDialogRef<EditCommentComponent>;
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  constructor(
    private articleService: ArticleService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  article: Article = {};
  commentTable: Commentary[] = [];
  id!: string;
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.user$)
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user;
      });
    }
    await this.getArticleDetails();
    if (this.article!.comment !== undefined) {
      for (let i = 0; this.article!.comment.length > i; i++) {
        this.commentTable.push(this.article!.comment[i]);
      }
    }
  }

  async getArticleDetails() {
    this.spinner.show();
    return await this.articleService
      .getOneArticle(this.id)
      .subscribe((res: Article[]) => {
        this.spinner.hide();
        this.article! = res[0];
        return res[0];
      });
  }

  addComment(): void {
    if (this.userData) {
      this.editDialogRef = this.dialog.open(EditCommentComponent, {
        width: '30rem',
      });

      this.editDialogRef.afterClosed().subscribe((component: Commentary) => {
        if (component !== undefined) {
          if (this.article!.comment !== undefined) {
            this.article!.comment.push(component);
          } else {
            this.article!.comment = [];
            this.article!.comment.push(component);
          }
          this.articleService.updateComment(
            this.article!,
            this.article!.comment
          );
        }
      });
    }
    else{
      alert("Merci de vous connecter ou créer un compte pour poster un commentaire")
    }
  }

  removeComment(comment: Commentary): void {
    let decision = confirm('Voulez-vous vraiment supprimer ce commentaire ?');
    if (decision) {
      const indexOfObject = this.article!.comment!.findIndex((object) => {
        return object.id === comment.id;
      });

      this.article!.comment!.splice(indexOfObject, 1);
      this.articleService.updateComment(this.article!, this.article!.comment!);
    }
  }
}
