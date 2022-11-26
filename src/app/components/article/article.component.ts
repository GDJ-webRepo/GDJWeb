import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { User } from 'src/app/model/user';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = {}
  user$ = this.usersService.currentUserProfile$;
  constructor(private articleService: ArticleService, private usersService: UsersService) { }

  ngOnInit(): void {
  }
 
  deleteArticle(article: Article) {
    let decision = confirm("Vous êtes sur le point de supprimer cet article");
    if(decision === true) {
      this.articleService.deleteArticle(article)
    }
  }

}
