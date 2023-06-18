import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/dtos/conversation';
import { environment } from 'src/environments/environment';
import { Conversation } from '../dtos/conversation';
import { ConversationDTO, MessageDTO } from './../dtos/conversation';

/**
 * Service that handles the conversation features.
 */
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieve all conversations of the current user.
   * @returns all conversations of the current user
   */
  public getAll(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(environment.apiUrl + '/conversation/all')
  }

  /**
   * Retrieve a conversation by its id.
   * @param conversationId the id of the conversation to retrieve
   * @returns the conversation with the given id
   */
  public getById(conversationId: number): Observable<Conversation> {
    const params = new HttpParams().append('conversationId', conversationId)
    return this.http.get<Conversation>(environment.apiUrl + '/conversation', { params })
  }

  /**
   * Retrieve an eventually existing conversation by its guide counterpart.
   * Only available for tourists.
   * @param guideId the id of the guide to retrieve the conversation with
   * @returns the conversation with the given guide, or null if it doesn't exist yet
   */
  public getByGuide(guideId: number): Observable<Conversation | null> { 
    const params = new HttpParams().append('guideId', guideId)
    return this.http.get<Conversation>(environment.apiUrl + '/conversation', { params })
  }
  
  // ---------
  // MESSAGES
  // ---------

  /**
   * Send a new message in an existing conversation.
   * @param m the message to send
   * @returns the sent message
   */
  public sendMessage(m: MessageDTO): Observable<Message> {
    return this.http.post<Message>(environment.apiUrl + '/conversation/message', m)
  }

  /**
   * Create a new conversation with a message.
   * Only available for tourists.
   * @param c the conversation to create
   * @returns the created conversation
   */
  public createConversation(c: ConversationDTO): Observable<Conversation> {
    return this.http.post<Conversation>(environment.apiUrl + '/conversation', c)
  }

}
