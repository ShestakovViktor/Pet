import React from 'react';
import {Style} from '@style';
import {Core} from '@core';
import {I18n} from '@i18n';
import {Storage} from '@storage';

type Payload = {
	core: Core;
	i18n: I18n;
	style: Style;
	storage: Storage;
	modal: React.ReactElement | undefined;
	setModal: (modal: React.ReactElement | undefined) => void;
	message: string | undefined;
	setMessage: (message: string | undefined) => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const Context = React.createContext<Payload>({} as Payload);