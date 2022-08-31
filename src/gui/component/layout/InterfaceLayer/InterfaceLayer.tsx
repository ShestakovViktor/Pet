import React from 'react';
import styles from './InterfaceLayer.m.css';

import {ProjectTree} from '@gui/component/custom';

import {
	LeftPanel,
	RightPanel,
	StatusBar,
} from '@gui/component/layout';

export function InterfaceLayer(): React.ReactElement {
	return (
		<div className={styles.interfaceLayer}>
			<LeftPanel/>
			<ProjectTree/>
			<RightPanel/>
			<StatusBar/>
		</div>
	);
}
