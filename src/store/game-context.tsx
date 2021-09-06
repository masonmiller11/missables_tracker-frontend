import React, { useState, useEffect, useCallback, useReducer } from 'react';

import Game from '../api/models/Game';

interface State {
  game: Game|null;
  games: Game[]|null;
}

interface InitialContext extends State {
  searchTerm: string|null;
}

const GameContext = React.createContext<InitialContext>({
  game: null,
  searchTerm: null,
  games: null
})

export const GameContextProvider: React.FC = (props) => {

  const contextValue = {
    game: null,
    searchTerm: null,
    games: null
  };

  return (
    <GameContext.Provider value={contextValue}>
          {props.children}
    </GameContext.Provider>
  );
}

export default GameContext;
