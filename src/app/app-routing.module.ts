import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesCenterPageComponent } from './pages/messages-center-page/messages-center-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TourEditorPageComponent } from './pages/tour-editor-page/tour-editor-page.component';
import { TourPageComponent } from './pages/tour-page/tour-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' }},
  { path: 'register', component: RegisterPageComponent, data: { title: 'Registrati' }},
  
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard], data: { title: 'Cerca' }},
  { path: 'tour', canActivate: [AuthGuard], children: [
    { path: 'create', component: TourEditorPageComponent, data: { title: 'Crea Tour' }},
    { path: ':id', component: TourPageComponent, data: { title: 'Visualizza tour' }},
  ]},
  { path: 'messages', canActivate: [AuthGuard], children: [
      { path: 'list', component: MessagesCenterPageComponent, data: { title: 'Centro messaggi' } },
      { path: ':id', component: MessagesPageComponent, data: { title: 'Messaggi' } },
    ]
  },

  { path: '', pathMatch: 'full', redirectTo: 'search' },  // default
  { path: '**', component: NotFoundPageComponent },      // 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
