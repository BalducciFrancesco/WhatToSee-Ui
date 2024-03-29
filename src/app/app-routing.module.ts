import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from './dtos/user';
import { AuthGuard } from './guards/auth.guard';
import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { GuidePageComponent } from './pages/guide-page/guide-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesCenterPageComponent } from './pages/messages-center-page/messages-center-page.component';
import { NotAuthorizedPageComponent } from './pages/not-authorized/not-authorized-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TourEditorPageComponent } from './pages/tour-editor-page/tour-editor-page.component';
import { TourPageComponent } from './pages/tour-page/tour-page.component';
import { TouristPageComponent } from './pages/tourist-page/tourist-page.component';

/**
 * All the routes of the application.
 * Each route can have a title and a role required to access it.
 */
const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' }},
  { path: 'register', component: RegisterPageComponent, data: { title: 'Registrati' }},
  { path: 'tourist/you', component: TouristPageComponent, canActivate: [AuthGuard], data: { title: 'La tua pagina turista', role: [UserRole.TOURIST] }},
  { path: 'guide/you', component: GuidePageComponent, canActivate: [AuthGuard], data: { title: 'La tua pagina guida', role: [UserRole.GUIDE] }},
  { path: 'administrator/you', component: AdministratorPageComponent, canActivate: [AuthGuard], data: { title: 'La tua pagina amministratore', role: [UserRole.ADMINISTRATOR] }},
  
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard], data: { title: 'Cerca' }},
  { path: 'tour', children: [
    { path: 'create', component: TourEditorPageComponent, canActivate: [AuthGuard], data: { title: 'Crea tour', role: [UserRole.GUIDE] }},
    { path: ':id/edit', component: TourEditorPageComponent, canActivate: [AuthGuard], data: { title: 'Modifica tour', role: [UserRole.GUIDE] } },
    { path: ':id', component: TourPageComponent, canActivate: [AuthGuard], data: { title: 'Visualizza tour' }},
  ]},
  { path: 'conversation', children: [
      { path: 'list', component: MessagesCenterPageComponent, canActivate: [AuthGuard], data: { title: 'Centro messaggi', role: [UserRole.TOURIST, UserRole.GUIDE] } },
      { path: 'new', component: ConversationPageComponent, canActivate: [AuthGuard], data: { title: 'Conversazione', role: [UserRole.TOURIST, UserRole.GUIDE] } },
      { path: ':id', component: ConversationPageComponent, canActivate: [AuthGuard], data: { title: 'Conversazione', role: [UserRole.TOURIST, UserRole.GUIDE] } },
    ]
  },

  { path: '', pathMatch: 'full', redirectTo: 'search' },  // default
  { path: 'not-authorized', component: NotAuthorizedPageComponent, data: { title: 'Non autorizzato' } }, // when any 401 response
  { path: '**', component: NotFoundPageComponent }, // route not found 
];

/**
 * Module that contains all the routes of the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
