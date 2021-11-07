import React from 'react';

const TemplateList: React.FC<{gameId: string}>  = ({
    gameId: gameIdProp
}) => {

  return (
    <p>Game Id To Pull Templates: {gameIdProp}</p>

  );
}

export default TemplateList;