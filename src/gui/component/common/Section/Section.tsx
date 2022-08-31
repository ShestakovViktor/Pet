import React from 'react';
import styles from './Section.m.css';

type Props = {
	title: string;
	children: string | React.ReactElement | React.ReactElement[];
}

export function Section(props: Props): React.ReactElement {
	return (
		<div className={styles.section}>
			<div className={styles.title}>{props.title}</div>
			<div>{props.children}</div>
		</div>
	);
}
