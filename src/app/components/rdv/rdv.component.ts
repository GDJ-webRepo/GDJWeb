import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {
calendly: any;
inline: any;

  constructor() { }

  ngOnInit(): void {
  }

}
