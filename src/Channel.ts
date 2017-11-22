import { Utilisateur } from "./Utilisateur";
import { Message } from "./Message";

export class Channel {
    private nom: string;
    private createur: Utilisateur;
    private participants: Utilisateur[];
    private messages: Message[];

    constructor(nom: string, createur: Utilisateur) {
        this.nom = nom;
        this.createur = createur;
        this.participants = [];
        this.messages = [];
    }

    getNom(): string {
        return this.nom;
    }

    
    public getCreateur() : string {
        return this.createur.pseudo;
    }

    public addUser(utilisateur: Utilisateur): void {
        this.participants.push(utilisateur);
    }

    public readMessages(): void {
        for (let message of this.messages) {
            message.read();
        }
    }
    
}