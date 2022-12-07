import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, public router: Router) { 
   
    this.afAuth.authState.subscribe((user) => {

      if (user?.emailVerified) {
        this.router.navigate(['accueil']);
      } 
    }) }

  ngOnInit(): void {
    


  }

 
}
