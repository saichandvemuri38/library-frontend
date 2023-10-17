import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/auth/spinner.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'library-frontend';
  public spinnerCheck = false;
  public loginScreen = false;
  ngOnInit(): void {
    this.router.url.includes("login") ? this.loginScreen = true : this.loginScreen = false;
  }
  constructor(public spinner:SpinnerService,private cdref: ChangeDetectorRef,public auth:AuthService,public router:Router){

  }
  spinnerInit() {
    this.spinner.getSpinnerObservable().subscribe((res) => {
      this.spinnerCheck = res === 'start';
      this.cdref.detectChanges();
    })
  }
}
