import { Message } from 'src/app/dtos/conversation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation } from '../dtos/conversation';


@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(environment.apiUrl + '/conversation')
  }

  public getById(conversationId: number): Observable<Conversation> {
    const params = new HttpParams().append('conversationId', conversationId)
    return this.http.get<Conversation>(environment.apiUrl + '/conversation', { params })
  }

  // returns an eventual existing conversation with the given guide from the current tourist
  public getByGuide(guideId: number): Observable<Conversation | null> { 
    const params = new HttpParams().append('guideId', guideId)
    return this.http.get<Conversation>(environment.apiUrl + '/conversation', { params })
  }
  
  // ---------

  public sendMessage(conversationId: number, m: string): Observable<Message> {
    return this.http.post<Message>(environment.apiUrl + '/conversation/' + conversationId + '/message', m)
  }

  // creates a new conversation with a message and returns the created one
  public createConversation(guideId: number, m: string): Observable<Conversation> {
    const params = new HttpParams().append('guideId', guideId)
    return this.http.post<Conversation>(environment.apiUrl + '/conversation', m, { params })
  }

}
