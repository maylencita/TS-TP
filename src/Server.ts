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

    register(pseudo: string, status: Status = Status.Connecte): void {
        this.utilisateurs.push(new Utilisateur(pseudo, status));
    }

    
    getUtilisateurs(): string[] {
        let listeUtilisateurs = [];
        for (let elem of this.utilisateurs) {
            listeUtilisateurs.push(elem.pseudo+ " " + elem.status);
        }
        return listeUtilisateurs
    }

    getIndeoxOfUtilisateur(p: string): number {
        let index = 0;
        for (let u of this.utilisateurs) {
            if(u.pseudo === p) {
                return index;
            }
            index ++;
        }
        return -1;
    }

    connecterUtilisateur(p: string): void {
        if (this.getIndeoxOfUtilisateur(p) === -1) {
            console.log("Cet utilisateur n'existe pas.");
        }
        else {
            this.utilisateurs[this.getIndeoxOfUtilisateur(p)].setStatus(Status.Connecte);
        }
    }
    
    
}