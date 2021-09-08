import GameInterface from './GameInterface';

class GameIGDB implements GameInterface {
    title: string;
    cover: string;
    summary: string;
    internetGameDatabaseId: number;

    constructor(game: GameIGDB) {
        this.title = game.title;
        this.cover = game.cover;
        this.summary = game.summary;
        this.internetGameDatabaseId = game.internetGameDatabaseId;
    }
}

export default GameIGDB;
