import React from 'react';
import styles from './LeftPanel.m.css';

import {
	//HystoryMenu,
	//TransformMenu,
	ViewMenu,
} from '@gui/component/compound/toolbar';



export function LeftPanel(): React.ReactElement {
	return (
		<div className={styles.leftPanel}>
			<ViewMenu/>
		</div>
	);
}
