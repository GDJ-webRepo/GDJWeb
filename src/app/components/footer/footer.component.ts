import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  userMessage!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmitForm(form: NgForm) {
    console.log(form.value);
  }
}
