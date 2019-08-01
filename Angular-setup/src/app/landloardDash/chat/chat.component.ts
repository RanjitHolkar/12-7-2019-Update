import { Component, OnInit } from '@angular/core';
import { LandlordService } from '../../_services/landlord.service';
import { chatkit,ChatManager, TokenProvider } from '@pusher/chatkit-client';
import {Url} from '../../mygloabal';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentuser:any;
  url=Url;
  msg:any;
  currentUserId:any;
  UserId:any;
  group:any;
  personal:any;
  property_name='';
  property_imges='';
  room_id:any;
  chatManager:any;
  currentRoom:any;
  roomUsers:any;
  userRooms:any;
  currentUser:any;
  messages=[];
  userdata=[];
  personalData:any;
  allData:any;
  filterData:any;

  constructor(private _landlordservice:LandlordService) { }
  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.UserId=currentUser['userinfo']['id'];
    this._landlordservice.getChatUser().subscribe(res=>{
      console.log(res);
      this.group=res['group'];
      this.filterData=res['group'];
      this.personal=res['personal'];
      this.personalData=res['personal'];
    })
    this.chatManager = new ChatManager({
      instanceLocator: 'v1:us1:aca7cea0-8c7e-4ed2-82b9-46c142d998d9',
      userId: this.UserId,
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/aca7cea0-8c7e-4ed2-82b9-46c142d998d9/token' })
    })
    // console.log(chatManager);
    this.chatManager.connect().then(currentUser => {
      this.currentUser=currentUser;
      console.log('Successful connection', currentUser)
    })
    .catch(err => {
      console.log('Error on connection', err)
    })
    // console.log(currentUser['userinfo']['id']);
    // this.getData();
  
    // const tokenProvider = new Chatkit.TokenProvider({
    //   url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/05f46048-3763-4482-9cfe-51ff327c3f29/token`
    // })
    // chatkit.createUser({
    //   id: "bookercodes",
    //   name: "Alex Booker"
    // })
  }

  showMessage(room_id,property_name,property_imges)
  {
    console.log(this.userRooms);
    this.property_name=property_name;
    this.property_imges=property_imges;
    this.room_id=room_id;
    this.messages = [];
    const { currentUser } = this;
    currentUser.subscribeToRoom({
      roomId: `${room_id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.userdata=message;
        //   var objDiv = $(".chatMiddleInner");
        //   var h = objDiv.get(0).scrollHeight;
        //  objDiv.animate({scrollTop: h});
          if(this.userdata['userStore']['users'][this.userdata['senderId']]['id'] == this.userdata['senderId'] && message['roomId'] ==this.room_id)
          {
            message['name']=this.userdata['userStore']['users'][this.userdata['senderId']]['name'];
            this.messages.push(message);
            
            // this.message.push(array('name'=> );
          }
        },
        onPresenceChanged: () => {
          this.roomUsers = this.currentRoom.users.sort((a) => {
            if (a.presence.state === 'online') return -1;
            return 1;
          });
        },
      },
    }).then(currentRoom => {
      this.currentRoom = currentRoom;
      this.roomUsers = currentRoom.users;
      this.userRooms = currentUser.rooms;
      console.log(this.roomUsers);
      console.log(this.currentRoom);
      console.log(this.userRooms);

    });
    console.log(this.messages);
    setTimeout(()=>{
      // scrollTop: $('#singleCommentDivMain').eq(0).scrollHeight}, 800);
      var objDiv = $(".chatMiddleInner");
      var h = objDiv.get(0).scrollHeight;
      objDiv.animate({scrollTop: h});
    },1000);

  //   var element = document.getElementById(".chatMiddleInner");
  //  element.scrollTop = element.scrollHeight;
    // var messageBody = document.querySelector('.chatMiddleInner');
    // messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  // sendMessage()
  // {
  //   this.chatManager.connect().then(currentUser => {
  //   currentUser.sendSimpleMessage({
  //     roomId: this.room_id,
  //     text: this.msg,
  //   })
  //   .then(messageId => {
  //     this.msg='';
  //   })
  //   .catch(err => {
  //     console.log(`Error adding message to `);
  //   })
  // })
  // }
  sendMessage() {
    const { msg, currentUser, currentRoom } = this;

    if (msg.trim() === '') return;

    currentUser.sendMessage({
      text: msg,
      roomId: `${currentRoom.id}`,
    });
    var objDiv = $(".chatMiddleInner");
      var h = objDiv.get(0).scrollHeight;
      objDiv.animate({scrollTop: h});
    this.msg = '';
  }
  search(term: string) {
    console.log(term);
    if(!term) {
      this.allData = this.filterData;
      this.personal= this.personalData;
    } else {
      this.allData = this.group.filter(x => 
         x.propertyName.trim().toLowerCase().includes(term.trim().toLowerCase())
      ); 
      this.personal = this.personal.filter(x => 
        x.userName.trim().toLowerCase().includes(term.trim().toLowerCase())
     );
    }
    console.log(this.allData);
    this.group=this.allData;
  }

}
