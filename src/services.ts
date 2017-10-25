import { ServerState, User, Message, Question, Answer, Note, Channel} from './models'

export function initApp(): ServerState {
  const superUser: User = { pseudo: 'admin', status: 'Connected', points: 5}

  return {
    users: [superUser],
    channels: [],
    messages: []
  }
} 

export function registerUser(state: ServerState, user: User): ServerState {
  return {
    ...state,
    users: [...state.users, user]
  }
}

// function registerUser(state: {}, user: User){} //We always pass server state
// function createChannel(user: User, contexte: {}, nom: string){} //Crée un chanel sans participants. Vérifier points >= 1
// function inviteUser(user: User, contexte: {}, nomChannel: string, upserPseudo: string) {} //Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel
// readChannel //Vérifier appartennance 
// sendQuestion(nomChannel, message) //Vérifier appartennance; if points ==0 then add 1 point to user
// sendAnswer(nomChannel, message) //Vérifier appartennance ou super user && points >= 3
// noteQuestion(...) //Vérifier appartenance && points >= 1 ; récalculer points
// noteAnswer(...) //Vérifier appartenance && points >= 2 ; récalculer points
// suspendUser(userPseudo) // only super users (5 points) peuvent suspendre un utilisateur
// calculerPoints // selon la notation de ces questions / responses
