import { Utilisateur } from "./Utilisateur";
import { Channel } from "./Channel";
import { Message } from "./Message";
import { Status } from "./Status";

export class Server {
    private utilisateurs: Utilisateur[];
    private channels: Channel[];
    private messages: Message[];

    constructor() {
        this.utilisateurs = [];
        this.utilisateurs.push(new Utilisateur("SuperUtilisateur", Status.Connecte, 5));
        this.messages = [];
        this.channels = [];
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

    createChannel(nom: string, pseudo: string): void {
        let userPointPositive: boolean = false;
        let utilisateur: Utilisateur;
        for (let u of this.utilisateurs) {
            if(u.pseudo === pseudo) {
                userPointPositive = (u.getPoints() >= 1)
                utilisateur = u;
            }
        }
        if (userPointPositive) {
            this.channels.push(new Channel(nom, utilisateur))
        }
        else {
            console.log("L'utilisateur ", pseudo," n'a pas les droits suffisants");
        }
    }

    getChannels(): string[] {
        let listeChannels = [];
        for (let elem of this.channels) {
            listeChannels.push(elem.getNom()+ " créé par " + elem.getCreateur());
        }
        return listeChannels;
    }

}