import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs';
import { Message } from 'src/app/dtos/message';
import { PlatformUser } from 'src/app/dtos/user';
import { MessageService } from 'src/app/services/message.service';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {

  messages!: Message[]
  interlocutorId!: number

  newMessage?: string

  constructor(private route: ActivatedRoute, private messagesService: MessageService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      map(interlocutorId => Number.parseInt(interlocutorId)),
      tap(interlocutorId => this.interlocutorId = interlocutorId),
      mergeMap(interlocutorId => this.messagesService.getAllByInterlocutor(interlocutorId))
    ).subscribe(messages => this.messages = messages)
  }

  sendMessage() {
    if(this.newMessage && this.newMessage.trim()) {
      this.messagesService.sendMessage({ recieverId: this.interlocutorId, content: this.newMessage, creationTimeStamp: new Date() }).subscribe(
        m => this.messages.push(m)
      )
    }
  }

}
