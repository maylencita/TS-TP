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
  status: 'Connected'|"Deconnected"|"Suspend";
  points: 0|1|2|3|4|5;
}

class Message{
  content:string
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

function inviteUser(channel:Channel, user:User){
  if(channel.user == user || user.points>=2){
    channel.participants.push(user)
  }
}
//Vérifier user is owner ou points >= 2; 
// Ajoute un utilisateur à un channel

// readChannel //Vérifier appartennance 

// sendQuestion //Vérifier appartennance; if points ==0 then add 1 point to user

// sendAnswer //Vérifier appartennance ou super user && points >= 3

// noteQuestion //Vérifier appartenance && points >= 1 ; récalculer points

// noteAnswer //Vérifier appartenance && points >= 2 ; récalculer points

// suspendUser // only super users (5 points) peuvent suspendre un utilisateur

// calculerPoints // selon la notation de ces questions / responses

//--------------------------
// TESTING THE APPLICATION
//-------------------------

(function(){
  const server = initState();

  document.body.textContent = server.users.map(user => "Hello ! " + user.pseudo)
  .reduce((acc,u)=>acc + " " + undefined, '');
})

// document.body.textContent = "Hello !";
