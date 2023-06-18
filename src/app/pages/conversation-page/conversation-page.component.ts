import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, filter, interval, map, mergeMap, shareReplay, switchMap } from 'rxjs';
import { Conversation } from 'src/app/dtos/conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserRole } from './../../dtos/user';
import { UserService } from './../../services/user.service';

/**
 * Page that shows the messages of a conversation and allows to send new ones.
 */
@Component({
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {

  /**
   * Conversation retrieved from backend.
   */
  conversation?: Conversation

  /**
   * Id of the guide that is being first contacted from the logged tourist.
   * It is defined only if the logged user is a tourist and he is starting a new conversation.
   */
  creationGuideId?: number | undefined

  /**
   * Role of the logged user.
   */
  role: UserRole | null = null

  /**
   * Enum for user roles, needed in the template.
   */
  UserRole = UserRole

  /**
   * User input for new message.
   */
  newMessage: string = ''

  /**
   * Observable for screen size changes.
   * Allows page to be responsive.
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  /**
   * Reference to the subscription to the polling incoming messages observable.
   * Needed to unsubscribe when the component is destroyed and avoid memory leaks.
   */
  unsub$?: Subscription

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {
    // get additional data for activated route, if any
    const state = this.router.getCurrentNavigation()!.extras.state
    if (state) { 
      // data is present, coming from tour page: conversation has already been loaded or tourist is creating a new conversation
      if(state['guideId']) {  // tourist is creating a new conversation
        this.creationGuideId = state['guideId'] // save guide id
      } else { // conversation has already been loaded
        this.conversation = state as Conversation // use already loaded conversation for display, in order to avoid another backend call
      }
    }
  }

  ngOnInit(): void {
    this.role = this.userService.getSessionRole()
    // check if conversation has already been loaded in constructor
    if(this.conversation === undefined && this.creationGuideId === undefined) {
      // conversation has not been loaded yet, retrieve it from backend
      this.route.paramMap.pipe(
        map((param: ParamMap) => param.get('id')),  // get conversation id from route
        filter(id => id != null),
        map(conversationId => Number(conversationId)),
        mergeMap(conversationId => this.conversationService.getById(conversationId))  // retrieve conversation
      ).subscribe(conversation => { 
        // save conversation for display and start polling
        this.conversation = conversation
        this.startPolling()
      })
    } else {
      // conversation has already been loaded, only start polling
      this.startPolling()
    }
  }

  /**
   * User has clicked on the send button or pressed enter.
   */
  sendMessage() {
    if(this.newMessage && this.newMessage.trim()) { // check if message is not empty
      // check if conversation has already been loaded or if it is a new conversation
      if(this.conversation !== undefined) {
        // send in an existing conversation
        this.conversationService.sendMessage({ content: this.newMessage, conversationId: this.conversation.id }).subscribe(m => {
          // reload messages and clear input
          this.conversation!.messages!.push(m)
          this.newMessage = ''
        })
      } else if(this.creationGuideId !== undefined) {
        // send in a new conversation
        this.conversationService.createConversation({ message: this.newMessage, guideId: this.creationGuideId }).subscribe(c => {
          // save conversation and clear input
          this.conversation = c
          this.newMessage = ''
        })
      }
    }
  }

  /**
   * After conversation has been loaded, start polling for new messages every 5 seconds.
   */
  private startPolling() {
    this.unsub$ = interval(5000).pipe(
      switchMap(() => this.conversationService.getById(this.conversation!.id))
    ).subscribe(conversation => this.conversation = conversation)
  }

  /**
   * Unsubscribe from polling when component is destroyed to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.unsub$?.unsubscribe()
  }

}
