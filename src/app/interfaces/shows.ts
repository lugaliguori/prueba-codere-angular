export class Shows {
    id: number;
    name: string;
    genre: string[];
    rating: number;
    image: string;
    releaseDate: string;
    endDate: string | null;
    summary: string;

    constructor(obj?: any) {
        this.id = obj && obj['id'] || null;
        this.name = obj && obj['name'] || null;
        this.genre = obj && obj['genres'] || null;
        this.rating = obj && obj['rating'] && obj['rating']['average'] || null;
        this.image = obj && obj['image'] && obj['image']["medium"] || null;
        this.releaseDate = obj && obj['premiered'] && new Date (obj['premiered']) || null;
        this.endDate = obj && obj['ended'] && new Date (obj['ended']) || null
        this.summary = obj && obj['summary'] || null
    }
}

export class episode{
    id: number;
    numberOfEpisode: number;
    season: number;
    name: string;
    summary: string;
    rating: number

    constructor(obj?: any){
        this.id = obj && obj['id'] || null;
        this.numberOfEpisode = obj && obj['number'] || null;
        this.season = obj && obj['season'] || null;
        this.name = obj && obj['name'] || null;
        this.summary = obj && obj['summary'] || null;
        this.rating = obj && obj['rating'] && obj['rating']['average'] || null
    }
}

export class cast{
    characterName: string;
    name: string;
    image: string;

    constructor(obj?: any){
        this.characterName = obj && obj['character'] && obj['character']['name'] || null;
        this.name = obj && obj['person'] && obj['person']['name'] || null;
        this.image = obj && obj['person'] && obj['person']['image'] && obj['person']['image']['medium'] || null
    }

}

export class crew{
    name: string;
    role: string;
    image: string
    
    constructor(obj?: any){
        this.name = obj && obj['person'] && obj['person']['name'] || null;
        this.role = obj && obj['type'] || null;
        this.image = obj && obj['person'] && obj['person']['image'] && obj['person']['image']['medium'] || null
    }
}

