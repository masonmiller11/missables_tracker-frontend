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
	listMyTemplates: 'templates',
	patchTemplate: (templateId: string | number) => 'templates/update/' + templateId,
	createTemplate: 'templates/create',
	deleteTemplate: (templateId: string | number) => 'templates/delete/' + templateId,

	patchTemplateStep: (templateStepId: string | number) => {
		return 'step/template/update/' + templateStepId;
	},
	createTemplateStep: 'step/template/create',
	deleteTemplateStep: (templateStepId: string | number) => {
		return 'step/template/delete/' + templateStepId;
	},
	patchTemplateSection: (templateSectionId: string | number) => 'section/template/update/' + templateSectionId,
	createTemplateSection: 'section/template/create',
	deleteTemplateSection: (templateSectionId: string | number) => 'section/template/delete/' + templateSectionId,

	listMyPlaythroughs: 'playthroughs/',
	deletePlaythrough: (playthroughId: string | number) => 'playthroughs/delete/' + playthroughId,
	createPlaythrough: 'playthroughs/create',
	patchPlaythrough: (playthroughId: string | number) => 'playthroughs/update/' + playthroughId,
	readPlaythrough: (playthroughId: string) => 'playthroughs/read/' + playthroughId,

	patchStep: (stepId: string | number) => 'step/update/' + stepId,
	createStep: 'step/create',
	deleteStep: (stepId: string | number) => 'step/delete/' + stepId,

	patchSection: (sectionId: string | number) => 'section/update/' + sectionId,
	createSection: 'section/create',
	deleteSection: (sectionId: string | number) => 'section/delete/' + sectionId,
}
