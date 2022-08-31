import {Style} from '@style';
import {Core} from '@core';
import {I18n} from '@i18n';
import {Storage} from '@storage';

export type Payload = {
	core: Core;
	i18n: I18n;
	style: Style;
	storage: Storage;
}