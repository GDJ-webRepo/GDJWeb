import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articlesData: Article[] = [];
  user$ = this.usersService.currentUserProfile$;
  constructor(private articleService: ArticleService,  private usersService: UsersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllArticles()
  }

  getAllArticles(){
    this.spinner.show();
    this.articleService.getArticles().subscribe((res:Article[]) => {
      console.log(res);
      this.articlesData = res
      this.spinner.hide();
    })
  }
 
  // retrieveArticles(): void {
  //   this.articleService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.articles = data;
  //   });
  // }

}

