import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model'
import { ArticleService } from 'src/app/shared/services/data/articles.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  article: Article = new Article();
  submitted = false;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  createArticle(): void {
    this.submitted = true;
    this.articleService.create(this.article).thne(()=> {
      console.log('created new article');
      this.submitted= false;
    })
  }

}
