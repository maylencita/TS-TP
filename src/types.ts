type Utilisateur = {
    pseudo: string
    status: Status 
    points: number
}

type Status = "Connecte" | "Deconnecte" | "Suspendu"

type Message = Question | Reponse | Note

type Question = {
    id: number,
    contenu: string, 
    emetteur: Utilisateur, 
    destination: Channel[]
}

type Reponse = {
    id: number,
    contenu: string, 
    emetteur: Utilisateur, 
    idQuestion: number
}

type Note = {
    id: number,
    contenu: number, 
    emetteur: Utilisateur, 
    idSource: number
}

type Channel = {
    nom: string, 
    createur: Utilisateur, 
    participants: Utilisateur[],
    messages: number[]
}

type Serveur = {
    utilisateurs: Utilisateur[], 
    channels: Channel[], 
    messages: Message[]
}