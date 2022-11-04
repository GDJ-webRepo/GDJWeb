import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articlesList : Article[] = [];
  articleObj : Article = {
    id :  '',
    title : '',
    body : '',
    author : '',
    actif : true,
    date : new Date(),
  }
  id : string = '';
  title : string = '';
  body : string = '';
  author : string = '';
  actif : boolean = true;
  date : Date = new Date();
  constructor(private data : DataService) {}
  ngOnInit(): void {
    this.getAllArticles();
  }


  resetForm(){
    this.id = '';
    this.title  = '';
    this.body = '';
    this.author = '',
    this.actif = true,
    this.date = new Date()
  }
  getAllArticles(){
    this.data.getAllArticles().subscribe(res => {
      this.articlesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching the data')
    })
  }

  addArticle(){
    if(this.title == '' || this.body == ''){
      alert('Fill all input field');
      return;
    }
    this.articleObj.id = '';
    this.articleObj.body = this.body;
    this.articleObj.title = this.title;
    this.articleObj.actif = true;
    this.articleObj.date = new Date();
    this.articleObj.author = '';
    this.data.addArticle(this.articleObj);
    this.resetForm();
  }

  deleteArticle(article : Article){
    if (window.confirm('Are you sure you want to delete ' + article.title + ' ?')) {
      this.data.deleteArtiucle(article);
    }
  }
}
