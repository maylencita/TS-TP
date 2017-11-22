export class Message {
    private question?: string;
    private reponse?: string;
    private note?: string;

    public read(): void {
        if (this.question) {
            console.log(this.question);
        }
        else {
            this.note ? console.log(this.note) : console.log(this.reponse);
        }
    }
}
