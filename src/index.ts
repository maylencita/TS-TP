

// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'

//--------------------------
// MODEL
//-------------------------

// TODO complete

class ServerState {
  users: User[];
  channels?: Channel[];
}

class User {
  pseudo: string;
  status: StatutType;
  points: number;
}



class Question {
  id : number
  question: string;
  note: number;
  auteur: User;
  nbNotes: number;
}

class Réponse {
  reponse: string;
  note: number;
  question_id: number 
  auteur: User;
  nbNotes: number;

}

type StatutType = "déconnecté" | "connecté" | "suspendu"
type Message = Question | Réponse 

class Channel {
  nom: String;
  createur: User;
  participants: User[];
  messages: Message[];
}

//--------------------------
// SERVICES
//-------------------------

function initState(): ServerState {
  const superUser: User = { pseudo: 'admin', status: 'connecté', points: 5 }

  let newServer: ServerState = {
    users: [superUser],
    channels: [] as Channel[],

  };

  return newServer;
};

function registerUser(state: ServerState, user: User): ServerState {
  state.users.push(user);
  return state;
};
  //We always pass server state

  function createChannel(state: ServerState, nom: String, user: User): ServerState {
    if (user.points >= 1) {
      let newChannel: Channel = {
        nom: nom,
        createur: user,
        participants: [user],
        messages: [] as Message[]
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

  };//Crée un chanel sans participants. Vérifier points >= 1

  function inviteUser(state: ServerState, invite: User, hote: User, channel: Channel): ServerState {
    if (hote.points >= 2 || hote === channel.createur) {
      channel.participants.push(invite);
    }
    return state;
  } ;//Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel

  function readChannel(channel: Channel, user: User): Message[] {
    if (channel.participants.includes(user)) {
      return channel.messages;
    }
    return null;
  }; //Vérifier appartennance 


  function createQuestion(channel : Channel, user: User, content: string, id: number): Question{
    let question : Question = {
      id : id,
      question: content,
      note: 0,
      auteur: user,
      nbNotes:0
    }
    return question;
   };

  function sendQuestion(channel: Channel, user: User, message: Question, state: ServerState): ServerState {
    if (channel.participants.includes(user)) {
      if (channel.messages === null) {
        channel.messages = [message];
      } else {
        channel.messages.push(message);
      }
      if (user.points === 0) {
        updateUserPoints(user, 1);

      }
    }
    return state;
  };

//Vérifier appartennance; if points ==0 then add 1 point to user

function createAnswer(channel : Channel, user: User, content: string, question: Question): Réponse{
 let reponse : Réponse = {
  reponse: content,
  note: 0,
  question_id: question.id, 
  auteur: user,
  nbNotes: 0
 }
 return reponse;
};

function sendAnswer(channel: Channel, user: User, message: Message, state: ServerState): ServerState{
  if (channel.participants.includes(user) && user.points >=3 ) {
    if (channel.messages === null) {
      channel.messages = [message];
    } else {
      channel.messages.push(message);
    }
  }
  return state;

} //Vérifier appartennance ou super user && points >= 3

function noteQuestion( channel: Channel, user: User, message: Message, state: ServerState, note: number): ServerState{
  if (channel.participants.includes(user) && user.points >= 1){
    message.nbNotes +=1;
      if (message.note === null){
        message.note = note;
      } else {
        message.note = (message.note*(message.nbNotes-1) + note) / message.nbNotes;
      }
  }
  return state;
}; //Vérifier appartenance && points >= 1 ; récalculer points

function noteAnswer ( channel: Channel, user: User, message: Message, state: ServerState, note: number): ServerState{
  if (channel.participants.includes(user) && user.points >= 2){
    message.nbNotes +=1;
    if (message.note === null){
      message.note = note;
    } else {
      message.note = (message.note*(message.nbNotes-1) + note) / message.nbNotes;
    }
  }  return state;
 }; //Vérifier appartenance && points >= 2 ; récalculer points

function suspendUser ( channel: Channel, user: User, superUser: User, state: ServerState): ServerState{
  if (superUser.points === 5){
    for( var i = 0; i < channel.participants.length; i++){ 
      if ( channel.participants[i] === user) {
        channel.participants.splice(i, 1); 
        i--;
      }
   }
  }
  return state;
}; // only super users (5 points) peuvent suspendre un utilisateur

function updateUserPoints(user: User, point: number): User {
  const updated = { ...user, point };
  return updated;
};

function getChannel(state: ServerState, nom: String): Channel{
for (var i = 0; i < state.channels.length; i++){
  if (state.channels[i].nom === nom){
    return state.channels[i];
  }
}
return null;
}
// calculerPoints // selon la notation de ces questions / responses

//--------------------------
// TESTING THE APPLICATION
//-------------------------


(function () {
  let server = initState();
  let Erwan: User = {
    pseudo: "Erwan",
    status: "connecté",
    points: 5
  };
  let Fran: User = {
    pseudo: "François",
    status: "connecté",
    points: 0
  };

  let Lucien: User = {
    pseudo: "Lucien",
    status: "connecté",
    points: 3
  };
  server = registerUser(server, Erwan);
  server = registerUser(server, Lucien);
  server = createChannel(server, "Messagerie", Erwan);
  server = createChannel(server, "Chat", Lucien);
  server = registerUser(server, Fran);
  let chan = getChannel(server, "Messagerie");
  server = inviteUser(server, Fran, Erwan, chan);
  let question = createQuestion(chan, Fran, "Est-ce que ca fontionne ?", 13);
  server = sendQuestion(chan, Fran, question, server);
  server = noteQuestion(chan, Erwan, question, server, 3);
  let reponse = createAnswer(chan, Erwan, "Oui ça fonctionne", question)
  server = sendAnswer(chan, Erwan, reponse, server);
  server = inviteUser(server, Lucien, Erwan, chan);
  server = noteQuestion(chan, Lucien, question, server, 5);
 // server = suspendUser(chan, Fran, Erwan, server);
  document.body.textContent = server.users.map(user => "Hello " + user.pseudo + "!").reduce((acc, u) => acc + " " + u, '');
  console.log(server);
})();
