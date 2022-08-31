import React from 'react';
import styles from './RightPanel.m.css';

import {
} from '@gui/component/compound/toolbar';

import {SettingsMenu} from '@gui/component/compound/toolbar/SettingsMenu';


export function RightPanel(): React.ReactElement {
	return (
		<div className={styles.rightPanel}>
			<SettingsMenu/>
		</div>
	);
}
