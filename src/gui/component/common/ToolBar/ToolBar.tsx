import React from 'react';
import styles from './ToolBar.m.css';

type Props = {
	title?: string;
	children: React.ReactElement | React.ReactElement[];
}

export function Toolbar(props: Props): React.ReactElement {
	return (<div className={styles.menu}>{props.children}</div>);
}
