import React from 'react';
import { useParams } from 'react-router-dom';

import SearchResults from '../components/Search/Search';

const SearchGamePage: React.FC  = () => {

    type Params = {
        searchTerm: string;
    }

    let {searchTerm} = useParams<Params>();

  return (
    <SearchResults searchTerm={searchTerm} />
  );
}

export default SearchGamePage;