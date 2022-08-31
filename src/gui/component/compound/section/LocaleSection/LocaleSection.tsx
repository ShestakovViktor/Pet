import React, {useContext} from 'react';
import {Section, Select} from '@gui/component/common';
import {Context} from '@gui';

export function LocaleSection(): React.ReactElement {
	const {i18n, storage} = useContext(Context);

	//{i18n.t('locale', {ns: 'LocaleSection'}) + ': '}
	return (
		<Section title={i18n.t('title', {ns: 'LocaleSection'})}>
			<Select
				property='name'
				options={i18n.getLocales()}
				selected={i18n.getLocale()}

				onClick={
					(locale: {key: string}): void => {
						i18n.setLocale(locale.key);
						storage.save('locale', locale.key);
					}
				}
			/>
		</Section>
	);
}
