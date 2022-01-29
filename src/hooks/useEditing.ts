
import { useState } from 'react';

interface ReturnedData {
	editing: boolean,
	editingStateHandler: () => void
}

const useEditing = (): ReturnedData => {
	const [editing, setEditing] = useState<boolean>(false);

	const editingStateHandler = () => {
		setEditing(!editing);
	}

	return {
		editing,
		editingStateHandler
	};
};

export default useEditing;