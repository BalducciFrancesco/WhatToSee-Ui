import { UserRole } from 'src/app/dtos/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/dtos/conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './messages-center-page.component.html',
  styleUrls: ['./messages-center-page.component.scss']
})
export class MessagesCenterPageComponent implements OnInit {
  
  conversations$!: Observable<Conversation[]>
  role?: UserRole
  UserRole = UserRole
  
  constructor(private userService: UserService, private messageService: ConversationService) {}
  
  ngOnInit(): void {
    this.role = this.userService.getSession()!.role
    this.conversations$ = this.messageService.getAll()
  }
  
}
