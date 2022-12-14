import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ImageUploadService } from 'src/app/shared/services/user/image-upload.service';
import { UsersService } from 'src/app/shared/services/user/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  isImageLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userData: User;
      router: Route
    },
    private formBuilder: UntypedFormBuilder,
    private storage: AngularFireStorage,
    private imageUploadService: ImageUploadService,
    private us: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private route:ActivatedRoute,private router:Router,
    private authService: AuthService
  ) {}

  editUserForm = this.formBuilder.group({
    displayName: [this.data.userData.displayName],
    firstName: [this.data.userData.firstName],
    lastName: [this.data.userData.lastName],
    email: [this.data.userData.email, [Validators.email]],
  });

  get displayName(): AbstractControl | null {
    return this.editUserForm.get('displayName');
  }

  get firstName(): AbstractControl | null {
    return this.editUserForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.editUserForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.editUserForm.get('email');
  }

  async selectFile(event: any): Promise<void> {
    if (event.target.files) {
      this.isImageLoading = true;
 
      for (let i = 0; i < File.length; i++) {
        const file = event.target.files[i];
        const filePath = `profilImage/${this.data.userData.uid}`;
        this.imageUploadService.uploadImage(file, filePath).pipe(
          this.toast.observe({
            loading: 'Uploading profile image...',
            success: 'Image uploaded successfully',
            error: 'There was an error in uploading the image',
          }),
          switchMap((url) =>
          this.us.updateUserProfileImg(url, this.data.userData.uid)
          )
        ).subscribe();
        this.isImageLoading = false;
      }
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const userInfo: User = this.data.userData.auth == true ?{
        uid: this.data.userData.uid,
        firstName: this.editUserForm.get('firstName')?.value,
        lastName: this.editUserForm.get('lastName')?.value,
        displayName: this.editUserForm.get('displayName')?.value,
        email: this.editUserForm.get('email')?.value
      }: {
        uid: this.data.userData.uid,
        firstName: this.editUserForm.get('firstName')?.value,
        lastName: this.editUserForm.get('lastName')?.value,
        displayName: this.editUserForm.get('displayName')?.value,
        auth: false
      }
      this.us.updateUserProfilInfo(userInfo, this.data.userData.uid);
      this.dialog.closeAll();
    }
  }

  deleteUser(){
    let decision = confirm('Voulez-vous vraiment supprimer cet article ?');
    if (decision) {
      this.authService.deletUser(this.data.userData)
      this.dialog.closeAll();
    }
  }
}
