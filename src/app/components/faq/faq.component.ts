import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { FAQ } from 'src/app/model/faq.model';
import { User } from 'src/app/model/user';
import { FaqService } from 'src/app/shared/services/data/faq.service';
import { UsersService } from 'src/app/shared/services/user/users.service';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  nbr : number;
  faqsData: FAQ[] = [];
  user$ = this.usersService.currentUserProfile$;
  userData?: User | null;
  constructor(  private faqService: FaqService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) {
      this.nbr = 4;
     }

  async ngOnInit(): Promise<void> {
    if (this.user$) {
      await this.user$.subscribe((user) => {
        this.userData = user;
      });
    }
    this.getAllFaqs();
  }

  getAllFaqs() {
    this.spinner.show();
    this.faqService.getAllFaq().subscribe((res: FAQ[]) => {

      this.faqsData = res;
      this.spinner.hide();
    });
  }

  addFaqDialog(): void {
    this.dialog.open(AddFaqComponent, {
      width: '40rem',
      data: {
        userData: this.userData,
      },
    });
  }

  deleteFaq(faq: FAQ) {
    let decision = confirm('Voulez-vous vraiment supprimer cet article ?');
    if (decision === true) {
      this.faqService.deleteFaq(faq);
    }
  }

  editFaqDialog(faq: FAQ): void {
    this.dialog.open(EditFaqComponent, {
      width: '40rem',
      height: '90%',
      data: {
        userData: this.userData,
        faqData: faq,
      },
    });
  }

  detailDialog(faq: FAQ): void{
    this.dialog.open(FaqDetailComponent, {
      width: '40rem',
      height: '90%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        faqData: faq,
      },
    });
  }

  augList(){
    this.nbr += 4;
  }


}
