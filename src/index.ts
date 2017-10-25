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

function utilisateurEnregistre(s: Serveur, u: Utilisateur) {
  return s.utilisateurs.indexOf(u) > -1
}

function appartenanceUtilisateurChannel(u: Utilisateur, c: Channel) {
  return c.participants.indexOf(u) > -1
}

function appartenanceMessageChannel(c: Channel, m: Message) {
  return c.messages.indexOf(m) > -1
}

function scoreMinimal(u: Utilisateur, s: number) {
  return u.points >= s
}

function enregUtilisateur(s: Serveur, u: Utilisateur) {
  if (!utilisateurEnregistre(s, u)) {
    s.utilisateurs.push(u)
    return s
  }
}

function marquerUtilisateurConnecte(s: Serveur, u: Utilisateur) {
  if (utilisateurEnregistre(s, u)) {
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

function lireMessages(u: Utilisateur, c: Channel) {
  if (appartenanceUtilisateurChannel(u, c)) {
    return c.messages
  }
}

function envoyerQuestion(u: Utilisateur, c: Channel, t: string) {
  if (appartenanceUtilisateurChannel(u, c)) {
    c.messages.push({auteur: u, contenu: t})
}

function repondreAQuestion(u: Utilisateur, c: Channel, q: Question, t: string) {
  if (appartenanceUtilisateurChannel(u, c) && appartenanceMessageChannel(c, q)) {
    c.messages.push({auteur: u, question:q, contenu: t})
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