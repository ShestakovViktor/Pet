import React from 'react';
import styles from './Tooltip.m.css';

type Props = {
	text: string;
}

export function Tooltip(props: Props): React.ReactElement {
	return (<div className={styles.tooltip}>{props.text}</div>);
}
