import { UserService } from './../../services/user.service';
import { UserRole } from './../../dtos/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, mergeMap, Observable, shareReplay, tap } from 'rxjs';
import { Message, Conversation } from 'src/app/dtos/conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {

  conversation?: Conversation
  role!: UserRole
  UserRole = UserRole

  newMessage: string = ''

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute, 
    private messagesService: ConversationService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.role = this.userService.getSession()!.role
    this.route.paramMap.pipe(
      map((param: ParamMap) => param.get('id')!),
      map(conversationId => Number(conversationId)),
      mergeMap(conversationId => this.messagesService.getById(conversationId))
    ).subscribe(conversation => this.conversation = conversation)
  }

  sendMessage() {
    if(this.newMessage && this.newMessage.trim()) {
      this.messagesService.sendMessage(this.conversation!.id, this.newMessage).subscribe(m => {
        // reload conversation
        this.conversation!.messages!.push(m)
        this.newMessage = ''
      })
    }
  }

}
