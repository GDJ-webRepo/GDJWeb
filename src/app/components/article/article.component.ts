import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { User } from 'src/app/model/user';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import { AddArticleComponent } from './add-article/add-article.component';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = {};
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  constructor(
    private articleService: ArticleService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user;
      });
    }
  }

  deleteArticle(article: Article) {
    let decision = confirm('Voulez-vous vraiment supprimer cet article ?');
    if (decision === true) {
      this.articleService.deleteArticle(article);
    }
  }

  editArticleDialog(article: Article): void {
    this.dialog.open(EditArticleComponent, {
      width: '40rem',
      height: '90%',
      data: {
        userData: this.userData,
        articleData: article,
      },
    });
  }
}
