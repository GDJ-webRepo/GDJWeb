import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FAQ } from 'src/app/model/faq.model';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss']
})
export class FaqDetailComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA)
  public data: {
    faqData: FAQ}, private dialog: MatDialog, ) { }

  ngOnInit(): void {
  }

  fermégjt(){
    this.dialog.closeAll();
  }

}
