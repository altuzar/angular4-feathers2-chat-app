import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  messages$: Observable<any[]>;
  users$: Observable<any[]>; 
  update: any;
  textMessage: any;
  _id: any;
  createAt: any;


  constructor(private data: DataService, private auth: AuthService) {
    // get messages from data service
    this.messages$ = data.messages$()
      // our data is paginated, so map to .data
      .map(m => m.data)
      // reverse the messages array, to have the most recent message at the end
      // necessary because we get a descendingly sorted array from the data service
      .map(m => m.reverse());

    // get users from data service
    this.users$ = data.users$()
      // our data is paginated, so map to .data
      .map(u => u.data);
  } 

  sendMessage(message: string) {
    this.data.sendMessage(message);
  }

  updateMessage(id: any, message: string, createdAt:any){
    console.log(id, message);
    let data = {
      text: message,
      createdAt: createdAt
    }
    this.data.updateMessage(id, data);
    this.update = false;
  }

  // Changing the Form from Submit to Update.
  changeText(id:any, message:any, createdAt:string){
    console.log(createdAt);
    this.update = true;
    this.textMessage = message;
    this._id = id;
    this.createAt = createdAt;
  }

  deleteMessage(id:any){
    this.data.removeMessage(id);
  }

  logOut() {
    this.auth.logOut();
  }
  
}
