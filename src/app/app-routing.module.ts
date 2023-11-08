import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { UserDashboardComponent } from './core/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { SuperAdminDashboardComponent } from './core/super-admin-dashboard/super-admin-dashboard.component';
import { BooksListComponent } from './core/books-list/books-list.component';
import { CartComponent } from './core/cart/cart.component';
import { BookUserRecordsComponent } from './core/book-user-records/book-user-records.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-list', component: BooksListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'records', component: BookUserRecordsComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Student' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'super-admin-dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Super-Admin' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
