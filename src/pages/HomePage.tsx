import React from 'react';

import Feature from '../components/HomePage/Feature';
import PopularGames from '../components/HomePage/PopularGames/PopularGames';

const HomePage: React.FC  = () => {
  return (
    <div>
      <Feature />
      <PopularGames />
    </div>
  );
}

export default HomePage;