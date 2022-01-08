export const endpoints = {
    authentication: 'login',
    signup: 'signup',
    listPopularGames: (
        itemsPerPage: number | null = null,
        page: number | null = null
    ) => {
        if (itemsPerPage && page)
            return 'games/popular/' + page + '/' + itemsPerPage;

        if (page) return 'games/popular/' + page;

        if (itemsPerPage) return 'games/popular/1/' + itemsPerPage;

        return 'games/popular';
    },
    searchIGDB: (searchTerm: string) => {
        return 'games/search/igdb/' + searchTerm;
    },
    searchGames: (searchTerm: string) => {
        return 'games/search/' + searchTerm;
    },
    readGame: (gameId: string) => {
        return 'games/read/' + gameId;
    },
    listTemplates: (gameId: string) => {
        return 'templates/bygame/' + gameId;
	},
	readTemplate: (templateId: string) => {
		return 'templates/read/' + templateId;
	}
};
