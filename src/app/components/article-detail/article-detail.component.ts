import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { Commentary } from 'src/app/model/comment.model';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  editDialogRef!: MatDialogRef<EditCommentComponent>;
  constructor(
    private Activatedroute: ActivatedRoute,private articleService: ArticleService, private router:Router, private dialog: MatDialog
  ) {}


  sub: Subscription | undefined;
  article!: Article;
  commentTable: Commentary[] = []
  ngOnInit() {
  
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
      console.log(component)
      if (this.article.comment! !== undefined) {
        this.article.comment!.push(component);
      }else {
        this.article.comment! = []
        this.article.comment.push(component)
      }
      this.commentTable.push(component)
      this.articleService.updateComment(this.article, this.article.comment!)
    })
  }
}

  

