import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {

  }
  public payload;
  constructor(public auth: AuthService) {
    this.payload = JSON.parse(localStorage.getItem('payload') );
    console.log(this.payload)
  }
  public items = [
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.auth.logOut();
      }
    },
    // {
    //   label: 'Delete',
    //   icon: 'pi pi-times',
    //   command: () => {

    //   }
    // }
  ];
}
