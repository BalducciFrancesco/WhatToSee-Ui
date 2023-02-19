import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../dtos/message';
import { Tour } from '../dtos/tour';

const fakeMessages: Message[] = [
  { id: 0, sender: { id: 0, firstName: 'john', lastName: 'watson', username: 'test123' }, reciever: { id: 1, firstName: 'tom', lastName: 'riggs', username: 'azaza12' }, content: 'wee', creationTimeStamp: new Date() },
]

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Message[]> {
    return of(fakeMessages)
    // return this.http.get<Message[]>(environment.apiUrl + '/messages')
  }

}
