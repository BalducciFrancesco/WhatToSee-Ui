import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from './dtos/user';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesCenterPageComponent } from './pages/messages-center-page/messages-center-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { NotAuthorizedPageComponent } from './pages/not-authorized/not-authorized-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TourEditorPageComponent } from './pages/tour-editor-page/tour-editor-page.component';
import { TourPageComponent } from './pages/tour-page/tour-page.component';
import { TouristPageComponent } from './pages/tourist-page/tourist-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' }},
  { path: 'register', component: RegisterPageComponent, data: { title: 'Registrati' }},
  { path: 'you', component: TouristPageComponent, canActivate: [AuthGuard], data: { title: 'La tua pagina', role: [UserRole.TOURIST] }},
  
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard], data: { title: 'Cerca' }},
  { path: 'tour', children: [
    { path: 'create', component: TourEditorPageComponent, canActivate: [AuthGuard], data: { title: 'Crea Tour', role: [UserRole.GUIDE] }},
    { path: ':id', component: TourPageComponent, canActivate: [AuthGuard], data: { title: 'Visualizza tour' }},
  ]},
  { path: 'messages', children: [
      { path: 'list', component: MessagesCenterPageComponent, canActivate: [AuthGuard], data: { title: 'Centro messaggi', role: [UserRole.TOURIST, UserRole.GUIDE] } },
      { path: ':id', component: MessagesPageComponent, canActivate: [AuthGuard], data: { title: 'Messaggi', role: [UserRole.TOURIST, UserRole.GUIDE] } },
    ]
  },

  { path: '', pathMatch: 'full', redirectTo: 'search' },  // default
  { path: 'not-authorized', component: NotAuthorizedPageComponent, data: { title: 'Non autorizzato' } }, // 403 // TODO also intercept 403 from backend
  { path: '**', component: NotFoundPageComponent },      // 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
