import { UserRole } from 'src/app/dtos/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/dtos/message';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './messages-center-page.component.html',
  styleUrls: ['./messages-center-page.component.scss']
})
export class MessagesCenterPageComponent implements OnInit {
  
  conversations$!: Observable<Conversation[]>
  role?: UserRole
  UserRole = UserRole
  
  constructor(private userService: UserService, private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.role = this.userService.getSession()!.role
    this.conversations$ = this.messageService.getAllConversation()
  }
  
}
