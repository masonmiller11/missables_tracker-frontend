import React from 'react';
import { useParams } from 'react-router-dom';


const TemplatePage: React.FC  = () => {

    type Params = {
        templateId: string;
    }

    let {templateId} = useParams<Params>();

  return (
    <p>Template Page Id: {}</p>
  );
}

export default TemplatePage;