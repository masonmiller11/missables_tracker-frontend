import internal from 'stream';
import { isConstructorDeclaration } from 'typescript';

class Game {
    title: string;
    cover: string;
    templateCount: number;
    playthroughCount: number;
    id: number;
    summary: string;
    storyline: string;
    rating: number;
    slug: string;
    screenshots: number[];
    artworks: number[];
    internetGameDatabaseId: number;
    releaseDate: Date;

    constructor(game: Game) {
        this.title = game.title;
        this.cover = game.cover;
        this.templateCount = game.templateCount;
        this.playthroughCount = game.playthroughCount;
        this.id = game.id;
        this.summary = game.summary;
        this.storyline = game.storyline;
        this.rating = game.rating;
        this.slug = game.slug;
        this.screenshots = game.screenshots;
        this.artworks = game.artworks;
        this.internetGameDatabaseId = game.internetGameDatabaseId;
        this.releaseDate = game.releaseDate;
    }
}

export default Game;