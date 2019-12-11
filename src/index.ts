// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'

//--------------------------
// MODEL
//-------------------------

// TODO complete

class ServerState {
  users: User[];
  channels: Channel[];
  messages: Message[]
}

class User {
  pseudo: string;
  status: 'Connected' | 'Deconnected' | 'Suspend';
  points: 0 | 1 | 2 | 3 | 4 | 5;
}

class Message {
  content: 'Question' | 'Answer' | 'Note';
  user: User
}

class Channel {
  name: string;
  creator: User;
  participants?: User[];
  messages?: Message[];
  user: User;
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
    channels: [] as Channel[],
    messages: [] as Message[],
  };
  return newServer;
};

function registerUser(state: ServerState, user: User): ServerState {
  state.users.push(user)
  return state;
}
//We always pass server state

function createChannel(state: ServerState, name: string, user: User): ServerState {
  if (user.points >= 1) {
    let newChannel: Channel = {
      name: name,
      creator: user,
      participants: [user],
      messages: [] as Message[],
      user: user,
    }
    if (state.channels === null) {
      state.channels = [newChannel];
    }
    else {
      state.channels.push(newChannel);
    }
    return state;
  } else {
    return state;
  }
  //Crée un chanel sans participants. Vérifier points >= 1

  function inviteUser(channel: Channel, user: User): boolean {
    if (channel.user == user || user.points >= 2) {
      channel.participants.push(user);
      return true;
    }
    return false;
  }
  //Vérifier user is owner ou points >= 2; 
  // Ajoute un utilisateur à un channel

  function readChannel(channel: Channel) {
    console.log(channel.name)
    console.log(channel.creator)
    console.log(channel.participants)
    console.log(channel.messages)
    console.log(channel.user)
  }
  //Vérifier appartennance 

  function createQuestion(user: User, content: string): Message {
    let question: Message = {
      content: "Question",
      user: user
    }
    return question;
  };

  function sendQuestion(channel: Channel, user: User) {
    if (channel.participants.indexOf(user) > 0) {
      if (user.points == 0) {
        user.points++;
        const message: Message = {
          content: 'Question',
          user: user
        }
        channel.messages.push(message)
      }
    }
  }

  function createAnswer(user: User, content: string, question: Message): Message {
    let reponse: Message = {
      content: "Answer",
      user: user
    }
    return reponse;
  };

  //Vérifier appartennance; if points ==0 then add 1 point to user

  function sendAnswer(channel: Channel, user: User) {

    if (channel.participants.indexOf(user) > 0 ||
      channel.user == user && user.points >= 3) {
      const message: Message = {
        content: "Answer",
        user: user
      }
      channel.messages.push(message)
    }
  } //Vérifier appartennance ou super user && points >= 3

  function noteQuestion(channel: Channel, user: User) {
    if (channel.participants.indexOf(user) > 0 && user.points >= 1) {

    }
  } //Vérifier appartenance && points >= 1 ; récalculer points

  function noteAnswer(channel: Channel, user: User) {
    if (channel.participants.indexOf(user) > 0 && user.points >= 2) {
      return true;
    }
    return false;
  } //Vérifier appartenance && points >= 2 ; récalculer points

  function suspendUser(user: User) {
    if (user.points == 5) {
      user.status = "Suspend"
    }
  } // only super users (5 points) peuvent suspendre un utilisateur

  function calculerPoints(channel: Channel) {

  } // selon la notation de ces questions / responses


  function getChannel(state: ServerState, name: String): Channel {
    for (var i = 0; i < state.channels.length; i++) {
      if (state.channels[i].name === name) {
        return state.channels[i];
      }
    }
    return null;
  }

  //--------------------------
  // TESTING THE APPLICATION
  //-------------------------

  (function(){
    let server = initState();
    let u1: User = {
      pseudo: "u1",
      status: "Connected",
      points: 5
    };
    let u2: User = {
      pseudo: "u2",
      status: "Connected",
      points: 0
    };
    let u3: User = {
      pseudo: "u3",
      status: "Connected",
      points: 3
    };
    server = registerUser(server, u1);
    server = registerUser(server, u3);
    server = createChannel(server, "Message1", u1);
    server = createChannel(server, "Message3", u3);
    server = registerUser(server, u2);
    let chan = getChannel(server, "Message1");
    inviteUser(chan, u2);
    let question = createQuestion(u2, "Is ok?");
    sendQuestion(chan, u2);
    noteQuestion(chan, u1);
    let q1: Message = {
      content: "Question",
      user: user
    };
    let reponse = createAnswer(u1, "Ok", q1)
    sendAnswer(chan, u1);
    inviteUser(chan, u3);
    noteQuestion(chan, u3);
    suspendUser(u2);
    document.body.textContent = server.users.map(user => "Hello ! " + user.pseudo)
    .reduce((acc,u)=>acc + " " + undefined, '');
    console.log(server);
  })

  // document.body.textContent = "Hello !";