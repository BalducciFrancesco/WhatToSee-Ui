import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs';
import { Message, Conversation } from 'src/app/dtos/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {

  conversation!: Conversation
  conversationId!: number

  newMessage?: string

  constructor(private route: ActivatedRoute, private messagesService: MessageService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      map(conversationId => Number.parseInt(conversationId)),
      tap(conversationId => this.conversationId = conversationId),
      mergeMap(conversationId => this.messagesService.getConversationById(conversationId))
    ).subscribe(conversation => this.conversation = conversation)
  }

  sendMessage() {
    if(this.newMessage && this.newMessage.trim()) {
      // this.messagesService.sendMessage({ recieverId: this.interlocutorId, content: this.newMessage, creationTimeStamp: new Date() }).subscribe(
      //   m => this.messages.push(m)
      // )
    }
  }

}
