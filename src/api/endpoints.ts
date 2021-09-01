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
};
