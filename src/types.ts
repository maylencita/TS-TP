export type Utilisateur = {
    pseudo: String
    status: Status 
    points: number
}

export type Status = "Connecte" | "Deconnecte" | "Suspendu"

export type Message = Question | Reponse | Note

export type Question = {
    id: number,
    contenu: String, 
    emetteur: Utilisateur, 
    destination: Channel[]
}

export type Reponse = {
    id: number,
    contenu: String, 
    emetteur: Utilisateur, 
    idQuestion: number
}

export type Note = {
    id: number,
    contenu: number, 
    emetteur: Utilisateur, 
    idSource: number
}

export type Channel = {
    nom: String, 
    createur: Utilisateur, 
    participants: Utilisateur[],
    messages: number[]
}

export type Serveur = {
    utilisateurs: Utilisateur[], 
    channels: Channel[], 
    messages: Message[]
}