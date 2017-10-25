console.log('Application started!')

type Utilisateur = {
    pseudo: String,
    status: Status,
    points: Number
}

type Status = 
    Connecte  |
    Deconnecte|
    Suspendu

type Connecte = "Connecte"

type Deconnecte = "Deconnecte"

type Suspendu = "Suspendu"

type Message = 
    Question  |
    Reponse   |
    Note

type Question = {
    contenu: String
}

type Reponse = {
    contenu: String
}

type Note = {
    note: Number
}

type Channel = {
    nom: String,
    createur: Utilisateur,
    listeParticipant: Utilisateur[]
}

type Serveur = {
    listeUtilisateur: Utilisateur[],
    listeChannel: Channel[],
    listeMessage: Message[]
}

function initialiserServeur(pseudo:String): Serveur{
    return {listeUtilisateur: [{pseudo: pseudo, status:"Connecte", points: 5}], listeChannel: [], listeMessage:[]};
}

function registrerUtilisateur(user:Utilisateur, server:Serveur): Serveur{
    return {
        ...server,
        listeUtilisateur: [...server.listeUtilisateur, user]
    }
}

function connexionUtilisateur(user:Utilisateur, server:Serveur): Utilisateur {
    return {
        ...user,
        status:"Connecte"
    }

}

function creerChannel(createur:Utilisateur, serveur:Serveur, nom:String, ...users:Utilisateur[]): [Channel, Serveur] {
    var channel:Channel = {nom:nom, createur:createur, listeParticipant:users};
    return [channel,
            {...serveur, listeChannel:[...serveur.listeChannel, channel]}]
}

const state0 :Serveur = initialiserServeur("MarieJulieComon");
const loulou0:Utilisateur = {pseudo:"Frouloulou", status:"Deconnecte", points: 2};

console.log("Initialisation serveur : ");
console.log(state0);
const state1 :Serveur = registrerUtilisateur(loulou0, state0);
console.log("Register frouloulou : ");
console.log(state1);
const loulou1 = connexionUtilisateur(loulou0, state1);
console.log("Connexion frouloulou : ")
console.log(loulou1);

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