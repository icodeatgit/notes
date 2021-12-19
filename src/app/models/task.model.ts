export class Task {
    _id: string;
    _listId: string;
    title: string;

    constructor() { 
        // Initialization inside the constructor
        this._id = '';
        this._listId = '';
        this.title = '';
     }
}