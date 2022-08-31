import React from 'react';
import {Button, Toolbar} from '@gui/component/common';

export function FileMenu(): React.ReactElement {
	return (
		<Toolbar title='File menu'>
			<Button tooltip='Save project' icon='floppy'/>
			<Button tooltip='Clear the project' icon='bin'/>
		</Toolbar>
	);
}