// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'

//--------------------------
// MODEL
//-------------------------

// TODO complete

class ServerState{
  users: [User];
}

class User {
  pseudo: string;
}


//--------------------------
// SERVICES
//-------------------------

function initState(): ServerState {
  const superUser: User = { pseudo: 'admin' } //status: 'Connected', points: 5

  let newServer: ServerState = {
    users: [superUser]
  };

  return newServer;
};

// function registerUser(state: ServerState, user: User): ServerState //We always pass server state

// function createChannel //Crée un chanel sans participants. Vérifier points >= 1

// function inviteUser //Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel

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

document.body.textContent = "Hello !";
