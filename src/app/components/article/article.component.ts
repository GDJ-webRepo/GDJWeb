import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { User } from 'src/app/model/user';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import {AddArticleComponent} from "./add-article/add-article.component";
import {MatDialog} from "@angular/material/dialog";
import {EditArticleComponent} from "./edit-article/edit-article.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = {}
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  constructor(private articleService: ArticleService, private usersService: UsersService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user
      })
    }
  }

  deleteArticle(article: Article) {
    let decision = confirm("Vous êtes sur le point de supprimer cet article");
    if(decision === true) {
      this.articleService.deleteArticle(article)
    }
  }

  editArticleDialog(article: Article): void {
    this.dialog.open(EditArticleComponent, {
      width: '40rem', data: {
          userData: this.userData,
        articleData: article
        },
    }
    );
  }

}
