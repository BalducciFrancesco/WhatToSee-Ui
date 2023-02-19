import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversations, Message } from '../dtos/message';

const fakeMessages: Message[] = [
  { id: 0, sender: { id: 0, firstName: 'john', lastName: 'watson', username: 'test123' }, reciever: { id: 1, firstName: 'tom', lastName: 'riggs', username: 'azaza12' }, content: 'wee', creationTimeStamp: new Date() },
]

const fakeConversations: Conversations = {
  guides: [{ id: 0, firstName: 'john', lastName: 'watson', username: 'test123', organizationName: 'oeoeoe', favouriteCity: { id: 0, name: 'asd' } }],
  tourists: [{ id: 1, firstName: 'hant', lastName: 'carlson', username: 'woa2003' }],
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getAllConversations(): Observable<Conversations> {
    return of(fakeConversations)
    // return this.http.get<Message[]>(environment.apiUrl + '/messages')
  }
  
  // guide or tourist
  public getAllByInterlocutor(interlocutorId: number): Observable<Message[]> {
    return of(fakeMessages)
    // const params = new HttpParams().append('interlocutor', interlocutorId)
    // return this.http.get<Message[]>(environment.apiUrl + '/messages', { params })
  }

  // ---------

  public deleteConversation(conversationId: number): void {
    const params = new HttpParams().append('conversation', conversationId)
    this.http.delete(environment.apiUrl + '/messages', { params }).subscribe()
  }

}
