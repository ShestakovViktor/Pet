import React, {useState} from 'react';
import styles from './Book.m.css';

import {Tree} from '@gui/component/common';


export type BookData = {
	title: string;
	page?: React.ReactElement;
	children?: BookData[];
}

type Props = {
	data: BookData;
	default?: React.ReactElement;
}

export function Book(props: Props): React.ReactElement {
	const [content, setContent] = useState<React.ReactElement>();

	//const content = props.content;
	function selectPage(selected: {page: React.ReactElement}): void {
		setContent(selected.page);
	}

	//const {component, attributes, children} = content;


	return (
		<div className={styles.book}>
			<div className={styles.navigation}>
				<Tree node={props.data} onclick={selectPage}/>
			</div>
			<div className={styles.content}>
				{content}
			</div>
		</div>
	);
}
