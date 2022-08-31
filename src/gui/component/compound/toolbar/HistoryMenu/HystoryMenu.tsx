import React from 'react';
import {Button, Toolbar} from '@gui/component/common';


export function HystoryMenu(): React.ReactElement {
	return (
		<Toolbar>
			<Button tooltip='Undo' icon='undo'/>
			<Button tooltip='Redo' icon='redo'/>
		</Toolbar>
	);
}
