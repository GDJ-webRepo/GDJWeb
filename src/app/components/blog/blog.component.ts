import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddArticleComponent } from '../article/add-article/add-article.component';
import { User } from '../../model/user';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articlesData: Article[] = [];
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  articlesLength: number = 6;
  constructor(
    private articleService: ArticleService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user;
      });
    }
    this.getAllArticles();
  }

  getAllArticles() {
    this.spinner.show();
    this.articleService.getArticles().subscribe((res: Article[]) => {
      this.articlesData = res;
      this.spinner.hide();
    });
  }

  switchLength() {
    if(this.articlesLength != this.articlesData.length) {
      console.log(this.articlesData.length)
      this.articlesLength = this.articlesData.length
    } else {
      console.log('out of else')
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= (max - 650)) {
      this.switchLength()
    }
  }


  addArticleDialog(): void {
    this.dialog.open(AddArticleComponent, {
      width: '40rem',
      height: '90%',
      data: {
        userData: this.userData,
      },
    });
  }
}
