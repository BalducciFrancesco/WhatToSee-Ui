import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/dtos/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  templateUrl: './messages-center-page.component.html',
  styleUrls: ['./messages-center-page.component.scss']
})
export class MessagesCenterPageComponent implements OnInit {
  
  conversations$!: Observable<Conversation[]>
  
  constructor(private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.conversations$ = this.messageService.getAllConversation()
  }
  
  // TODO refresh
  delete(conversationId: number) {
    this.messageService.deleteConversation(conversationId)
  }
  
}
