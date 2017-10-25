console.log('Application started!')

//--------------------------
// MODELE
//-------------------------

type Utilisateur = {
  pseudo : string
  statut : Statut
  points : number
}

type Statut = Connecte | Deconnecte | Suspendu
type Connecte = "Connecte"
type Deconnecte = "Deconnecte"
type Suspendu = "Suspendu"

type Channel = {
  nom : string
  createur : Utilisateur
  participants : Utilisateur[]
  messages : Message[]
}

type Message = Question | Reponse | Note
type Question = {
  auteur : Utilisateur
  contenu : string
}
type Reponse = {
  auteur : Utilisateur
  question : Question
  contenu : string
}
type Note = {
  auteur : Utilisateur
  message : Message
  valeur : number
}

type Serveur = {
  utilisateurs : Utilisateur[]
  channels : Channel[]
  messages : Message[]
}

//--------------------------
// FONCTIONS
//-------------------------

function enregUtilisateur(s: Serveur, u: Utilisateur) {
  if (s.utilisateurs.indexOf(u) == -1) {
    s.utilisateurs.push(u)
    return s
  }
}

function marquerUtilisateurConnecte(s: Serveur, u: Utilisateur) {
  if (s.utilisateurs.indexOf(u) > -1) {
    u.statut = "Connecte"
    return s
  }
}

function creerChannel(s: Serveur, u: Utilisateur, n: string) {
  if (u.points >= 1) {
    s.channels.push({nom: n, createur: u, participants: [], messages: []})
    return s
  }
}

function lireMessages(s: Serveur, u: Utilisateur, c: Channel) {
  if (c.participants.indexOf(u) > -1 || c.createur == u) {
    return c.messages
  }
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