import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  name!: string;
  email!: string;
  message!: string;

  constructor(private router: Router, private http: HttpClient, private toast: HotToastService) {}

  ngOnInit(): void {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      this.toast.loading("Envoi du formulaire")
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xvonkkwa',
        { name: email.name, replyto: email.email, message: email.message },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
            contactForm.reset();
            this.toast.close()
            this.toast.success("Formulaire envoyé !")
          }
        );
    }
  }
}
