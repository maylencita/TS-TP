import { Utilisateur } from "./Utilisateur";
import { Channel } from "./Channel";
import { Message } from "./Message";
import { Status } from "./Status";

export class Server {
    private utilisateurs: Utilisateur[];
    private channels: Channel[];
    private messages: Message[];
    // private server: Server;

    constructor() {
        this.utilisateurs = [];
        this.utilisateurs.push(new Utilisateur("SuperUtilisateur", Status.Connecte, 5));
    }

    register(pseudo: string): void {
        this.utilisateurs.push(new Utilisateur(pseudo));
    }

    
    getUtilisateurs(): string[] {
        let listeUtilisateurs = [];
        for (let elem of this.utilisateurs) {
            listeUtilisateurs.push(elem.pseudo);
        }
        return listeUtilisateurs
    }
    
    
}