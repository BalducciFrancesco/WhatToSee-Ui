import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, filter, interval, map, mergeMap, shareReplay, switchMap } from 'rxjs';
import { Conversation } from 'src/app/dtos/conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserRole } from './../../dtos/user';
import { UserService } from './../../services/user.service';

@Component({
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {

  conversation?: Conversation
  creationGuideId?: number | undefined // defined only if is tourist starting a conversation
  role: UserRole | null = null
  UserRole = UserRole

  newMessage: string = ''

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  unsub$!: Subscription

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {
    const state = this.router.getCurrentNavigation()!.extras.state
    if (state) { // conversation has already been loaded or creating a new one (coming from tour page)
      if(state['guideId']) {  // creating 
        this.creationGuideId = state['guideId']
      } else { // already loaded
        this.conversation = state as Conversation
      }
    }
  }

  ngOnInit(): void {
    this.role = this.userService.getSessionRole()
    if(this.conversation === undefined && this.creationGuideId === undefined) { // not already loaded data from constructor
      this.route.paramMap.pipe(
        map((param: ParamMap) => param.get('id')),
        filter(id => id != null),
        map(conversationId => Number(conversationId)),
        mergeMap(conversationId => this.conversationService.getById(conversationId))  // retrieve conversation
      ).subscribe(conversation => { 
        this.conversation = conversation
        this.startPolling()
      })
    } else {
      this.startPolling()
    }
  }

  sendMessage() {
    if(this.newMessage && this.newMessage.trim()) {
      if(this.conversation !== undefined) { // sending in an already existing conversation
        this.conversationService.sendMessage({ content: this.newMessage, conversationId: this.conversation.id }).subscribe(m => {
          // reload conversation
          this.conversation!.messages!.push(m)
          this.newMessage = ''
        })
      } else if(this.creationGuideId !== undefined) { // sending in a new conversation
        this.conversationService.createConversation({ message: this.newMessage, guideId: this.creationGuideId }).subscribe(c => {
          this.conversation = c
          this.newMessage = ''
          // TODO navigate to current page with conversation id
        })
      }
    }
  }

  private startPolling() {
    this.unsub$ = interval(5000).pipe(
      switchMap(() => this.conversationService.getById(this.conversation!.id))
    ).subscribe(conversation => this.conversation = conversation)
  }

  ngOnDestroy(): void {
    this.unsub$.unsubscribe()
  }

}
