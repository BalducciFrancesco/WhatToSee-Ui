import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' }},
  { path: 'register', component: RegisterPageComponent, data: { title: 'Register' }},

  { path: '', pathMatch: 'full', redirectTo: 'login' },  // default
  { path: '**', component: NotFoundPageComponent },      // 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
