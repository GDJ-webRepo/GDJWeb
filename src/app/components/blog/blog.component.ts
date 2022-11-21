import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles?: Article[];
  user$ = this.usersService.currentUserProfile$;
  constructor(private articleService: ArticleService,  private usersService: UsersService,) { }

  ngOnInit(): void {
    this.retrieveArticles();
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
    });
  }

}

