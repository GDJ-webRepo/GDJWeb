import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'firebase/auth';
import { AsyncSubject, Subject } from 'rxjs';
import { FAQ } from 'src/app/model/faq.model';
import { FaqService } from 'src/app/shared/services/data/faq.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {

  private editorSubject: Subject<any> = new AsyncSubject();
  isImageLoading = false;
  preview = '';
  file: any
  imgVerif = false
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userData: User;
      faqData: FAQ
    },
    private formBuilder: UntypedFormBuilder,
    private us: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private as: FaqService
  ) {}

  ngOnInit(): void {
  }

  editFaqForm = this.formBuilder.group({
    title: [this.data.faqData.title, Validators.required],
    body: [this.data.faqData.body, Validators.required],
  });

  get title(): AbstractControl | null {
    return this.editFaqForm.get('title');
  }

  get body(): AbstractControl | null {
    return this.editFaqForm.get('body');
  }

  handleEditorInit(e: { editor: any; }) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
    }





  onSubmit(): void {
    if (this.editFaqForm.valid) {
      const faqInfo: FAQ = {
        id: this.data.faqData.id,
        title: this.editFaqForm.get('title')?.value,
        body: this.editFaqForm.get('body')?.value,
        author: this.data.userData.displayName!
      };

      this.as.updateFaqInfo(faqInfo, this.data.faqData.id);
      this.dialog.closeAll();
    }
  }


}

