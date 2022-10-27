import React/*, {useContext}*/ from 'react';
import styles from './TitleBar.m.css';
import {MenuBar} from '@gui/component/common';
//import {Context} from '@gui';

export function TitleBar(): React.ReactElement {
	//const {i18n} = useContext(Context);

	const data: {
		title: string;
		children: {
			name: string;
			onclick?: () => void;
		}[];
	}[] = [
		/*
		{
			title: i18n.t('menu', {ns: 'TitleBar'}),
			children: [
				{name: 'Makfliliy makflulium'},
				{name: 'What the fuck'},
			],
		},
		{
			title: i18n.t('file', {ns: 'TitleBar'}),
			children: [
				{name: 'Makfliliy makflulium'},
				{name: 'What the fuck'},
			],
		},
		{
			title: i18n.t('edit', {ns: 'TitleBar'}),
			children: [
				{name: 'Makfliliy makflulium'},
				{name: 'What the fuck'},
			],
		},
		*/

	];

	return (
		<div className={styles.titleBar}>
			<MenuBar data={data}/>
		</div>
	);
}