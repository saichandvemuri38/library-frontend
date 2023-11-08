import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { PrimengModule } from './modules/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './core/user-dashboard/user-dashboard.component';
import { InterceptService, LoaderService } from './services/auth/intercept.service';
import { SpinnerService } from './services/auth/spinner.service';
import { HeaderComponent } from './core/header/header.component';
import { BooksListComponent } from './core/books-list/books-list.component';

import { AddBookComponent } from './core/add-book/add-book.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './core/super-admin-dashboard/super-admin-dashboard.component';
import { SharedService } from './services/shared.service';
import { LibraryListComponent } from './core/library-list/library-list.component';
import { CartComponent } from './core/cart/cart.component';
import { BookUserRecordsComponent } from './core/book-user-records/book-user-records.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    HeaderComponent,
    BooksListComponent,

    AddBookComponent,
    AdminDashboardComponent,
    SuperAdminDashboardComponent,
    LibraryListComponent,
    CartComponent,
    BookUserRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, SpinnerService, AuthGuard, RoleGuard, SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
