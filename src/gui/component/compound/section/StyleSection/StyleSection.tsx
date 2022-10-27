/*
import React, {useContext} from 'react';
import {Section, Select} from '@gui/component/common';
import {Context} from '@gui';


export function StyleSection(): React.ReactElement {
	const {i18n, style, storage} = useContext(Context);



	return (
		<Section title={i18n.t('title', {ns: 'StyleSection'})}>

			<Select
				options={style.getThemes()}
				property='name'
				selected={style.getTheme()}
				onClick={
					({key}: {key: string}): void => {
						const root = document
							.querySelector('body > .container');

						if (root) root.setAttribute('data-theme', key);

						style.setTheme(key);
						storage.save('theme', key);
					}
				}
			/>
		</Section>
	);
}
*/