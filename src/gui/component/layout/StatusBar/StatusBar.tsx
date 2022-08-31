import {Context} from '@gui';
import {FpsMonitor} from '@gui/component/custom';
import React, {useContext} from 'react';
import styles from './StatusBar.m.css';

export function StatusBar(): React.ReactElement {
	const {message} = useContext(Context);

	return (
		<div className={styles.statusBar}>
			<div>Message: {message}</div>

			<FpsMonitor/>
		</div>
	);
}