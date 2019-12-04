// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'

//--------------------------
// MODEL
//-------------------------

// TODO complete

class ServerState{
  users: User[];
  channels : Channel[];
  messages: Message[]
}

class User {
  pseudo: string;
  status: 'Connected'|'Deconnected'|'Suspend';
  points: 0|1|2|3|4|5;
}

class Message{
  content: 'Question'|'Answer'|'Note';
  user: User
}

class Channel{
  name : string;
  creator : string;
  participants? : User[];
  messages? : Message[]
  user : User;
}

//--------------------------
// SERVICES
//-------------------------

function initState(): ServerState {
  const superUser: User = { 
    pseudo: 'admin', 
    status: 'Connected',
    points: 5
  } //status: 'Connected', points: 5

  let newServer: ServerState = {
    users: [superUser],
    channels:[] as Channel[],
    messages:[] as Message[],
  };
  return newServer;
};

function registerUser(state: ServerState, user: User): ServerState{
  state.users.push(user)
  return state;
} 
//We always pass server state

function createChannel (user: User): Channel{
  if (user.points >= 1){
    const newChannel:Channel = {
      name : "new Channel",
      creator : "Channel Creator",
      user : user,
    }
    return newChannel;
  }
  return null;
}
//Crée un chanel sans participants. Vérifier points >= 1

function inviteUser(channel:Channel, user:User):boolean{
  if(channel.user == user || user.points>=2){
    channel.participants.push(user);
    return true;
  }
  return false;
}
//Vérifier user is owner ou points >= 2; 
// Ajoute un utilisateur à un channel

function readChannel(channel:Channel){
  console.log(channel.name)
  console.log(channel.creator)
  console.log(channel.participants)
  console.log(channel.messages)
  console.log(channel.user)
} 
//Vérifier appartennance 

function sendQuestion (channel:Channel, user:User){
  if(channel.participants.indexOf(user)>0){
    if(user.points==0){
      user.points++;
      const message: Message = {
        content : 'Question',
        user: user
      }
      channel.messages.push(message)
    }
  }
}
//Vérifier appartennance; if points ==0 then add 1 point to user

function sendAnswer(channel:Channel,user:User){
  
  if(channel.participants.indexOf(user)>0 ||
  channel.user == user && user.points >= 3){
    const message:Message = {
      content : "Answer",
      user: user
    }
    channel.messages.push(message)
  }
} //Vérifier appartennance ou super user && points >= 3

function noteQuestion(channel:Channel, user:User){
  if(channel.participants.indexOf(user)>0 && user.points>=1){

  }
} //Vérifier appartenance && points >= 1 ; récalculer points

function noteAnswer(channel:Channel, user:User){
  if(channel.participants.indexOf(user)>0 && user.points>=2){

  }
} //Vérifier appartenance && points >= 2 ; récalculer points

function suspendUser(user:User){
  if(user.points == 5){
    user.status="Suspend"
  }
} // only super users (5 points) peuvent suspendre un utilisateur

function calculerPoints(channel:Channel){

} // selon la notation de ces questions / responses

//--------------------------
// TESTING THE APPLICATION
//-------------------------

// (function(){
//   const server = initState();

//   document.body.textContent = server.users.map(user => "Hello ! " + user.pseudo)
//   .reduce((acc,u)=>acc + " " + undefined, '');
// })

document.body.textContent = "Hello !";
