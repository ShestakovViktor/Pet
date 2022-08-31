import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Editor} from '@gui/component/layout';
import {Payload} from '@gui/type';
import {Context} from '@gui';

function App(props: {payload: Payload}): React.ReactElement {
	const [modal, setModal] = useState<React.ReactElement>();
	const [message, setMessage] = useState<string>();

	return (
		<Context.Provider value={{
			...props.payload,
			modal,
			setModal,
			message,
			setMessage,
		}}>
			<Editor/>
		</Context.Provider>
	);

}

export class Gui {
	constructor(payload: Payload) {
		this.initRoutes(payload);
		this.initThemes(payload);
	}

	initRoutes(payload: Payload): void {
		const root = ReactDOM.createRoot(document.body);
		root.render(<App payload={payload}/>);
	}

	initThemes({style}: Payload): void {
		const themes = style.getThemes();

		for (const {key} of themes) {
			const theme = style.getTheme(key);
			const res = style.toCssFormat(theme);

			const element = document.createElement('style');
			element.innerHTML = res;
			document.head.appendChild(element);
		}
	}
}
