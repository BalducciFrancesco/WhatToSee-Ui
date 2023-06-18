import { Component } from '@angular/core';

/**
 * Page for displaying a message when the user is not authorized to access a page.
 * Redirected when 401 is received from the server or doesn't have the required role.
 */
@Component({
  templateUrl: './not-authorized-page.component.html',
  styleUrls: ['./not-authorized-page.component.scss']
})
export class NotAuthorizedPageComponent {

}
