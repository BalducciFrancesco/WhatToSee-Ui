import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { TourCardComponent } from './components/tour-card/tour-card.component';
import { TourStopCardComponent } from './components/tour-stop-card/tour-stop-card.component';
import { TourStopEditorDialogComponent } from './components/tour-stop-editor-dialog/tour-stop-editor-dialog.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesCenterPageComponent } from './pages/messages-center-page/messages-center-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { NotAuthorizedPageComponent } from './pages/not-authorized/not-authorized-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { TourEditorPageComponent } from './pages/tour-editor-page/tour-editor-page.component';
import { TourPageComponent } from './pages/tour-page/tour-page.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { HeadersInterceptor } from './services/headers.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    NotAuthorizedPageComponent,
    RegisterPageComponent,
    TourEditorPageComponent,
    TourStopEditorDialogComponent,
    TourStopCardComponent,
    SearchPageComponent,
    TourCardComponent,
    TourPageComponent,
    ReviewCardComponent,
    StarRatingComponent,
    ReportDialogComponent,
    MessagesCenterPageComponent,
    MessagesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // material
    LayoutModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
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
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '80vw' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
