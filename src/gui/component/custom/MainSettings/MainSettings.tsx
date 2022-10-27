import React/*, {useContext}*/ from 'react';
import styles from './MainSettings.m.css';

import {Book, BookData} from '@gui/component/common';
/*
import {
	StyleSection,
	LocaleSection,
	GeneralSection,
} from '@gui/component/compound/section';
*/
//import {Context} from '@gui/Context';

export function MainSettings(): React.ReactElement {

	//const context = useContext(Context);

	//const {i18n} = context;

	const data: BookData = {
		title: '',
		children: [
			/*
			{
				title: i18n.t('general', {ns: 'MainSettings'}),
				page: (<GeneralSection/>),
			},
			{
				title: i18n.t('style', {ns: 'MainSettings'}),
				page: <StyleSection/>,
			},
			{
				title: i18n.t('locale', {ns: 'MainSettings'}),
				page: (<LocaleSection/>),
			},
			*/
		],
	};


	return (
		<div className={styles.mainSettings}>
			<Book data={data}/>
		</div>
	);
}