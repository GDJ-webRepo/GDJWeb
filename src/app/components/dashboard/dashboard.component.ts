import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Article} from "../../model/article";
import {DataService} from "../../shared/data.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) {}
  ngOnInit(): void {

  }



}