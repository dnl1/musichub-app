export class MusicalProject {
    id: number;
    name: string;
    owner_id: number;
    musical_genre_id: number;
    created_at: string;
    updated_at: string;
    finish: number

    constructor(){
        this.name = '';
        this.created_at = '';
        this.updated_at = '';
        this.finish = 0;
    }
}