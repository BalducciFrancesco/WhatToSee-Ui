import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/dtos/conversation';
import { UserRole } from 'src/app/dtos/user';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserService } from 'src/app/services/user.service';

/**
 * Page for display the already started conversations for the logged user.
 */
@Component({
  templateUrl: './messages-center-page.component.html',
  styleUrls: ['./messages-center-page.component.scss']
})
export class MessagesCenterPageComponent implements OnInit {
  
  /**
   * Conversations started by the logged user retrieved from backend.
   */
  conversations$!: Observable<Conversation[]>

  /**
   * Role of the logged user.
   */
  role: UserRole | null = null

  /**
   * Enum for user roles, needed in the template.
   */
  UserRole = UserRole
  
  constructor(private userService: UserService, private messageService: ConversationService) {}
  
  ngOnInit(): void {
    this.role = this.userService.getSessionRole()
    this.conversations$ = this.messageService.getAll()
  }
  
}
