import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import { apiListTemplates } from '../../../api';
import TemplateModel from '../../../api/models/Template/Template';
import classes from './TemplateList.module.css';
import TemplateCard from './TemplateCard/TemplateCard';
import TemplateListOptions from '../../../interfaces/templateListOptions.interface';



const TemplateList: React.FC<{
	templates: TemplateModel[] | null,
	templateListOptions: TemplateListOptions,
}> = ({
	templates, templateListOptions }) => {

		if (templates) {
			return (
				<div className={classes.templateListContainer}>
					{/* <p>Game Id To Pull Templates: {gameIdProp}</p> */}
					{templates!.map((template) => (
						<TemplateCard templateCardOptions={templateListOptions} template={template} />
					))}
				</div>
			);
		}
		{
			return <p className={classes.spinner}> Loading Templates... </p>;
		}
	};

export default TemplateList;