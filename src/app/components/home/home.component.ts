import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Article } from 'src/app/model/article.model';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // user$ = this.usersService.currentUserProfile$;
  articles?: Article[];
  booli = false;
  user$ = this.usersService.currentUserProfile$;
  constructor(private articleService: ArticleService, private usersService: UsersService, public authService: AuthService) { }

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
      this.booli = true;
    });
  }
}