import { Server } from "./Server";
import { Status } from "./Status";

let server: Server;
server = new Server();

console.log('Application started!');
server.register("Elisa", Status.Deconnecte);
console.log(server.getUtilisateurs());
server.connecterUtilisateur("Elisa");
console.log(server.getUtilisateurs());
server.register('Loic');
console.log(server.getUtilisateurs());
server.createChannel('Channel de Elisa','Elisa')
server.createChannel('Channel du SuperUtilisateur','SuperUtilisateur')
console.log(server.getChannels());



//--------------------------
// TESTING THE APPLICATION
//-------------------------

/*
(
  function(){
    const state: StateStore = initApp()

    // prove that 
    registerUser(state, user).users contains user

    // prove that if user is registered
    connectUser(state, user).users contains user and user.status === 'Connected' 

    // prove that if user is not registered
    connectUser(state, user) equals state

    etc
  }
)
*/