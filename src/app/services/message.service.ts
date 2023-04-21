import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation, Message, MessageDTO } from '../dtos/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getAllConversation(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(environment.apiUrl + '/messages')
  }
  
  // guide or tourist
  public getConversationById(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(environment.apiUrl + '/messages/' + conversationId)
  }

  // ---------

  public deleteConversation(conversationId: number): void {
    this.http.delete<Conversation>(environment.apiUrl + '/messages/' + conversationId).subscribe()
  }

  public sendMessage(message: MessageDTO): Observable<Message> {
    return this.http.post<Message>(environment.apiUrl + '/messages', message)
  }

}
