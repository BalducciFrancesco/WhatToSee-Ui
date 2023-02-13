import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/dtos/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  templateUrl: './messages-center-page.component.html',
  styleUrls: ['./messages-center-page.component.scss']
})
export class MessagesCenterPageComponent implements OnInit {

  messages$!: Observable<Message[]>
  
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages$ = this.messageService.getAll()
  }

}
