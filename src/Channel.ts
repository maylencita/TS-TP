import { Utilisateur } from "./Utilisateur";
import { Message } from "./Message";

export class Channel {
    private nom: string;
    private createur: Utilisateur;
    private participants: Utilisateur[];
    private messages: Message[];
}