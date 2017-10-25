type Utilisateur = {
    pseudo: string
    status: Status 
    points: number
}

type Status = "Connecte" | "Deconnecte" | "Suspendu"

type Message = Question | Reponse | Note

type Question = {
    contenu: string, 
    emetteur: Utilisateur, 
    destination: Channel[]
}

type Reponse = {
    contenu: string, 
    emetteur: Utilisateur, 
    question: Question
}

type Note = {
    contenu: number, 
    emetteur: Utilisateur, 
    source: Question | Reponse
}

type Channel = {
    nom: string, 
    createur: Utilisateur, 
    participants: Utilisateur[]
}

type Serveur = {
    utilisateurs: Utilisateur[], 
    channels: Channel[], 
    messages: Message[]
}