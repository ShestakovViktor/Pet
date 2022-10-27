import React from 'react';
import {Core} from '@core';

type Payload = {
	core: Core;
	modal: React.ReactElement | undefined;
	setModal: (modal: React.ReactElement | undefined) => void;
	message: string | undefined;
	setMessage: (message: string | undefined) => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const Context = React.createContext<Payload>({} as Payload);