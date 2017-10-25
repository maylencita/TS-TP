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

function initServeur(s: Serveur, superUtilisateur: Utilisateur){
  if (superUtilisateur.points == 5)
    s.utilisateurs = []
    s.channels = []
    s.messages = []
    s.utilisateurs.push(superUtilisateur)
  return s
}

function ajoutUtilisateurChannel(c: Channel, u: Utilisateur){
  if (u.points >= 2)
    if (c.participants.indexOf(u) == -1)
      (c.participants.push(u))
  return c
}

function calculPointsUtilisateur(u: Utilisateur) {
  return u.points
}

// superUtilisateur = {pseudo : "super", statut : "Deconnecte", points : 5};

// Fonctions annexes

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

// Fonctions statut

function marquerUtilisateurConnecte(s: Serveur, u: Utilisateur) {
  if (utilisateurEnregistre(s, u)) {
    u.statut = "Connecte"
    return s
  }
}

function marquerUtilisateurDeconnecte(s: Serveur, u: Utilisateur) {
  if (utilisateurEnregistre(s, u)) {
    u.statut = "Deconnecte"
    return s
  }
}

function marquerUtilisateurSuspendu(s: Serveur, u: Utilisateur) {
  if (utilisateurEnregistre(s, u)) {
    u.statut = "Suspendu"
    return s
  }
}

// Fonctions serveur

function enregUtilisateur(s: Serveur, u: Utilisateur) {
  if (!utilisateurEnregistre(s, u)) {
    s.utilisateurs.push(u)
    return s
  }
}

function suspendreUtilisateur(s: Serveur, u: Utilisateur, us: Utilisateur) {
  if (scoreMinimal(u, 5) && utilisateurEnregistre(s, us)) {
    s.utilisateurs.push(u)
    return s
  }
}

// Fonctions channels

function creerChannel(s: Serveur, u: Utilisateur, n: string) {
  if (scoreMinimal(u, 1)) {
    s.channels.push({nom: n, createur: u, participants: [], messages: []})
    return s
  }
}

function lireMessages(u: Utilisateur, c: Channel) {
  if (appartenanceUtilisateurChannel(u, c)) {
    return c.messages
  }
}

// Fonctions messages

function envoyerQuestion(u: Utilisateur, c: Channel, t: string) {
  if (appartenanceUtilisateurChannel(u, c)) {
    c.messages.push({auteur: u, contenu: t})
  }
}

function repondreAQuestion(u: Utilisateur, c: Channel, q: Question, t: string) {
  if (appartenanceUtilisateurChannel(u, c) && appartenanceMessageChannel(c, q)) {
    c.messages.push({auteur: u, question:q, contenu: t})
  }
}

function noterQuestion(q: Question, u: Utilisateur, c: Channel) {
  if (c.messages.indexOf(q) > -1 && c.participants.indexOf(u) > -1 && q.auteur.points < 5)
    q.auteur.points ++
}

function noterReponse(r: Reponse, u: Utilisateur, c: Channel) {
  if (c.messages.indexOf(r.question) > -1 && c.participants.indexOf(u) > -1 && r.auteur.points < 5)
    r.auteur.points ++
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