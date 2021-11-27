import React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Divider, Classes, ButtonGroup, Elevation, H5 } from '@blueprintjs/core';

import Template from '../../../api/models/Template/Template';
import classes from './TemplateCard.module.css';

const TemplateCard: React.FC<{template: Template}>  = ({
    template
}) => {

    const [templateList, setTemplateList] = useState<null | Template[]>(null);
  
    return (
      <p>The title of this template is: {template.title}</p>
  
    );
}

export default TemplateCard;