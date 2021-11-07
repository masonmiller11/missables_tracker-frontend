import React from 'react';

import Feature from '../components/HomePage/Feature';
import PopularGames from '../components/HomePage/PopularGames/PopularGames';

const HomePage: React.FC  = () => {
  return (
    <React.Fragment>
      <Feature />
      <PopularGames />
    </React.Fragment>
  );
}

export default HomePage;