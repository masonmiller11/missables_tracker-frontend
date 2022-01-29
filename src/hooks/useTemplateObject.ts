
import { useState } from 'react';

interface ReturnData<T> {
	object: T,
	editObjectHandler: (templateObject: T) => void;
	setObjectHandler: (templateObject: T) => void;
}


const useTemplateObject = <T extends {}>(templateObject: T): ReturnData<T> => {
	const [object, setObject] = useState<T>(templateObject);

	const editObjectHandler = (templateObject: T) => {
		setObject(templateObject);
	}

	const setObjectHandler = (newTemplateObject: T) => {
		setObject(newTemplateObject);
	}

	return {
		object,
		editObjectHandler,
		setObjectHandler
	};
};

export default useTemplateObject;