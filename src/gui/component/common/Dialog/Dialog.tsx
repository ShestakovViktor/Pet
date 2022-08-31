import React from 'react';
import {Button} from '@gui/component/common';
import styles from './Dialog.m.css';

type Props = {
	title: string;
	children: React.ReactElement[];
}

export function Dialog(props: Props): React.ReactElement {
	return (
		<div className={styles.dialog}>
			<div className='header'>
				<h2>{props.title}</h2>
				<Button icon='close'/>
			</div>
			<div className='content'>{props.children}</div>,
		</div>
	);
}
