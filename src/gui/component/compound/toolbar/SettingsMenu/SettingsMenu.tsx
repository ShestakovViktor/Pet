import React, {useContext} from 'react';
import {Button, Toolbar} from '@gui/component/common';
import {Context} from '@gui/Context';
import {MainSettings} from '@gui/component/custom';

export function SettingsMenu (): React.ReactElement {
	const context = useContext(Context);

	return (
		<Toolbar title='Settings menu'>
			<Button
				tooltip='Settings'
				icon='settings'
				onClick={
					(): void => {
						context.setModal(<MainSettings/>);
					}
				}
			/>

			<Button
				icon='rotate'
			/>
		</Toolbar>
	);
}