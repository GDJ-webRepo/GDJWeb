import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commentary } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {

  userData?: User | null;
  user$ = this.usersService.currentUserProfile$;
  constructor(private formBuilder: UntypedFormBuilder, public readonly afs: AngularFirestore, private usersService: UsersService, private dialog: MatDialogRef<EditCommentComponent>) { }

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user
      })
    }
  }

  editCommentForm = this.formBuilder.group({
    body: ['', Validators.required],
  });

  get body(): AbstractControl | null {
    return this.editCommentForm.get('title');
  }


  onSubmit(): void {
    if (this.editCommentForm.valid) {
      const comment: Commentary = {
        id : this.afs.createId(),
        userUid : this.userData?.uid,
        body : this.editCommentForm.get('body')?.value,
        author : this.userData?.displayName,
        date : new Date(),
      };


      this.dialog.close(comment)
    }
  }

}
