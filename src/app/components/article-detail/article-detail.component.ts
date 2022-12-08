import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ArticleDetailComponent implements OnInit, OnDestroy {
  editDialogRef!: MatDialogRef<EditCommentComponent>;
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  constructor(
    private Activatedroute: ActivatedRoute,private articleService: ArticleService, private router:Router, private usersService: UsersService, private dialog: MatDialog
  ) {}


  sub: Subscription | undefined;
  article!: Article;
  commentTable: Commentary[] = []
  async ngOnInit() {
  
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user;
      });
    }
    
    this.article=history.state;

    if ( this.article.id === undefined) {
      this.router.navigate(['blog'])
    }else{
      if (this.article.comment !== undefined) {
        for(let i = 0 ; this.article.comment!.length > i; i++) 
        {
          this.commentTable.push(this.article.comment![i])
        }
      }
     
    }

  }


  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  addComment(): void {
    this.editDialogRef = this.dialog.open(EditCommentComponent, {
      width: '30rem',
    });

    this.editDialogRef.afterClosed().subscribe((component: Commentary) => {
      if (component !== undefined) {
          console.log(component)
        if (this.article.comment! !== undefined) {
          this.article.comment!.push(component);
        }else {
          this.article.comment! = []
          this.article.comment.push(component)
        }
        this.commentTable.push(component)
        this.articleService.updateComment(this.article, this.article.comment!)
      }
    })
  }

  removeComment(comment: Commentary): void {
    let decision = confirm('Voulez-vous vraiment supprimer ce commentaire ?')
    if(decision) {
      const indexOfObject = this.commentTable.findIndex(object => {
        return object.id === comment.id;
      });
      
      this.commentTable.splice(indexOfObject, 1);
      this.articleService.updateComment(this.article, this.commentTable!)
    }
  }
}

  

