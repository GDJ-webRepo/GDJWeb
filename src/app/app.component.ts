import { transition } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GDJ-web';
  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }
  //When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById('backtop')!.style.display = 'block';
    } else {
      document.getElementById('backtop')!.style.display = 'none';
    }
  }

  //When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; //For Chrome, Firefox, IE and Opera
  }

  // logout() {
  //   this.authService.SignOut()
  // }
}
