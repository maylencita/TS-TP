// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'
//--------------------------
// MODEL
//-------------------------
// TODO complete
class ServerState {
}
class User {
}
class Message {
}
class Channel {
}
//--------------------------
// SERVICES
//-------------------------
function initState() {
    const superUser = {
        pseudo: 'admin',
        status: 'Connected',
        points: 5
    }; //status: 'Connected', points: 5
    let newServer = {
        users: [superUser],
        channels: [],
        messages: [],
    };
    return newServer;
}
;
function registerUser(state, user) {
    state.users.push(user);
    return state;
}
//We always pass server state
function createChannel(user) {
    if (user.points >= 1) {
        const newChannel = {
            name: "new Channel",
            creator: "Channel Creator",
            user: user,
        };
        return newChannel;
    }
    return null;
}
//Crée un chanel sans participants. Vérifier points >= 1
function inviteUser(channel, user) {
    if (channel.user == user || user.points >= 2) {
        channel.participants.push(user);
        return true;
    }
    return false;
}
//Vérifier user is owner ou points >= 2; 
// Ajoute un utilisateur à un channel
function readChannel(channel) {
    console.log(channel.name);
    console.log(channel.creator);
    console.log(channel.participants);
    console.log(channel.messages);
    console.log(channel.user);
}
//Vérifier appartennance 
function sendQuestion(user) {
    if (user.points == 0) {
        user.points++;
        return true;
    }
    return false;
}
//Vérifier appartennance; if points ==0 then add 1 point to user
function sendAnswer(channel, user) {
    if (channel.user == user && user.points >= 3) {
        return true;
    }
    return false;
} //Vérifier appartennance ou super user && points >= 3
function noteQuestion() {
} //Vérifier appartenance && points >= 1 ; récalculer points
// noteAnswer //Vérifier appartenance && points >= 2 ; récalculer points
// suspendUser // only super users (5 points) peuvent suspendre un utilisateur
// calculerPoints // selon la notation de ces questions / responses
//--------------------------
// TESTING THE APPLICATION
//-------------------------
// (function(){
//   const server = initState();
//   document.body.textContent = server.users.map(user => "Hello ! " + user.pseudo)
//   .reduce((acc,u)=>acc + " " + undefined, '');
// })
document.body.textContent = "Hello !";
