// import * as test from './tests'
// import * as services from './services'
// import * as models from './models'
//--------------------------
// MODEL
//-------------------------
// TODO complete
var ServerState = /** @class */ (function () {
    function ServerState() {
    }
    return ServerState;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
var Channel = /** @class */ (function () {
    function Channel() {
    }
    return Channel;
}());
//--------------------------
// SERVICES
//-------------------------
function initState() {
    var superUser = {
        pseudo: 'admin',
        status: 'Connected',
        points: 5
    }; //status: 'Connected', points: 5
    var newServer = {
        users: [superUser],
        channels: [],
        messages: []
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
        var newChannel = {
            name: "new Channel",
            creator: "Channel Creator",
            user: user
        };
        return newChannel;
    }
    return null;
}
//Crée un chanel sans participants. Vérifier points >= 1
function inviteUser() {
}
//Vérifier user is owner ou points >= 2; Ajoute un utilisateur à un channel
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
(function () {
    var server = initState();
    document.body.textContent = server.users.map(function (user) { return "Hello ! " + user.pseudo; })
        .reduce(function (acc, u) { return acc + " " + undefined; }, '');
});
// document.body.textContent = "Hello !";
