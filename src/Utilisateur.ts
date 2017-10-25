import { Status } from "./Status";

export class Utilisateur {
    public pseudo: string;
    private status: Status;
    private points: number;


    constructor(pseudo: string, status: Status = Status.Connecte, points: number = 0) {
        this.pseudo = pseudo;
        this.status = status;
        this.points = points;
    }

}