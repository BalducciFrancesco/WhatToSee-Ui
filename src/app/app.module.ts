import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemsDialogComponent } from './components/problems-dialog/problems-dialog.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { TourCardComponent } from './components/tour-card/tour-card.component';
import { StopCardComponent } from './components/tour-stop-card/tour-stop-card.component';
import { StopEditorDialogComponent } from './components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
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
 * Register the IT locale for the application.
 */
registerLocaleData(localeIt);

/**
 * Main module of the application.
 */
@NgModule({
  declarations: [
    // all the components of the application
    AppComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    NotAuthorizedPageComponent,
    RegisterPageComponent,
    TourEditorPageComponent,
    StopEditorDialogComponent,
    StopCardComponent,
    SearchPageComponent,
    TourCardComponent,
    TourPageComponent,
    ReviewCardComponent,
    StarRatingComponent,
    ReportDialogComponent,
    ProblemsDialogComponent,
    ReviewDialogComponent,
    MessagesCenterPageComponent,
    ConversationPageComponent,
    TouristPageComponent,
    GuidePageComponent,
    AdministratorPageComponent
  ],
  imports: [
    // all the required modules dependencies
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // material dependencies
    LayoutModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatAutocompleteModule,  // must precede chips, for some reason
    MatChipsModule,
    MatRippleModule,
    DragDropModule
  ],
  providers: [
    // all the tokens provided to the application (defaults)
    { provide: LOCALE_ID, useValue: 'it' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '80vw' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
