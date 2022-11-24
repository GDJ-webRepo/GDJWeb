import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/shared/services/data/articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  
  constructor(
    private _Activatedroute: ActivatedRoute,private articleService: ArticleService,
  ) {}
  id: string | null | undefined;
  sub: Subscription | undefined;
  articles: Article[] = [];
  article!: Article;
  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.id = params.get('id');
      this.retrieveArticles();
      // let article = this.articles.find((p) => p.id == this.id);
      // if (article) {
      //   this.article.id = article.id
      //   this.article.title = article.title
      //   this.article.body = article.body
      //   this.article.imageUrl = article.imageUrl
      //   this.article.author = article.author 
      //   this.article.date = article.date
      // }
    });
  }



  retrieveArticles(): void {
    this.articleService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.articles = data;
      for( var i = 0; i < data.length; i=i+1){
        if (data[i].id == this.id ){
          this.article= data[i];
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
