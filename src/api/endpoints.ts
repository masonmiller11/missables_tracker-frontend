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
	},
    listMyTemplate: 'templates',
    patchTemplateStep: (templateStepId: string|number) => {
		return 'step/template/update/' + templateStepId;
	},
	createTemplateStep: 'step/template/create',
	deleteTemplateStep: (templateStepId: string|number) => {
		return 'step/template/delete/' + templateStepId;
	},
	patchTemplateSection: (templateSectionId: string|number) => {
		return 'section/template/update/' + templateSectionId;
	},
	createTemplateSection: 'section/template/create',
	deleteTemplateSection: (templateSectionId: string|number) => {
		return 'section/template/delete/' + templateSectionId;
	},
	patchTemplate: (templateId: string|number) => {
		return 'playthroughs/update/' + templateId;
	},
	createTemplate: 'templates/create',
	deleteTemplate: (templateId: string|number) => {
		return 'templates/delete/' + templateId;
	}
};
