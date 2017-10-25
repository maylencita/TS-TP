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
    listeParticipant: Number[]
}

type Serveur = {
    listeUtilisateur: Utilisateur[],
    listeChannel: Channel[],
    listeMessage: Message[]

}

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