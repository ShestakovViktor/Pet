import React from 'react';
import {Button, Toolbar} from '@gui/component/common';

export function ViewMenu(): React.ReactElement {
	return (
		<Toolbar title='Settings menu'>
			<Button
				tooltip='Projection'
				icon='projection'
				onClick={
					(): void => {
						//this.props.payload.core.changeProjection();
					}
				}
			/>
		</Toolbar>
	);
}