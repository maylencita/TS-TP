import { Utilisateur } from "./Utilisateur";
import { Channel } from "./Channel";
import { Message } from "./Message";

export class Server {
    private utilisateurs: Utilisateur[];
    private channels: Channel[];
    private messages: Message[];
}