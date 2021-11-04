import React from 'react';

const Templates: React.FC<{gameId: string}>  = ({
    gameId: gameIdProp
}) => {

  return (
    <p>Game Id To Pull Templates: {gameIdProp}</p>

  );
}

export default Templates;