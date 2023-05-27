import { Message } from 'src/app/dtos/conversation';
import { HttpClient } from '@angular/common/http';
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

  public getById(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(environment.apiUrl + '/conversation/' + id)
  }
  
  // ---------

  public sendMessage(conversationId: number, m: string): Observable<Message> {
    return this.http.post<Message>(environment.apiUrl + '/conversation/' + conversationId + '/message', m)
  }

}
