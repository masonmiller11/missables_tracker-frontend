import React from 'react';
import { useParams } from 'react-router-dom';

import Template from '../components/Template/TemplateComponent';


const TemplatePage: React.FC  = () => {

    type Params = {
        templateId: string;
    }

    let {templateId} = useParams<Params>();

  return (
    <Template templateId = {templateId} />
  );
}

export default TemplatePage;