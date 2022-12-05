import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AsyncSubject, Subject } from 'rxjs';
import { FAQ } from 'src/app/model/faq.model';
import { User } from 'src/app/model/user';
import { ArticleService } from 'src/app/shared/services/data/articles.service';
import { FaqService } from 'src/app/shared/services/data/faq.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {

  private editorSubject: Subject<any> = new AsyncSubject();
  isImageLoading = false;
  preview = '';
  file: any
  imgVerif = false
  constructor( @Inject(MAT_DIALOG_DATA)
               public data: {
    userData: User} , private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog, private as: FaqService, private toast: HotToastService) { }

  ngOnInit(): void {
  }

  addFaqForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  get title(): AbstractControl | null {
    return this.addFaqForm.get('title');
  }

  get body(): AbstractControl | null {
    return this.addFaqForm.get('body');
  }

  handleEditorInit(e: { editor: any; }) {
  this.editorSubject.next(e.editor);
  this.editorSubject.complete();
  }


  onSubmit(): void {
    if (this.addFaqForm.valid) {
      const faq: FAQ = {
        title: this.addFaqForm.get('title')?.value,
        body: this.addFaqForm.get('body')?.value,
        date: new Date(),
        author: this.data.userData.displayName!,
        actif: true,
      };
      this.as.addFaq(faq) 
      this.dialog.closeAll()
    }
  }

}
