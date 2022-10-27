import styles from './App.m.css';
import React, {useState, useEffect, useRef} from 'react';
import {Context} from '@gui';
import {ModalLayer, InterfaceLayer} from '@gui/component/layout';
import {Core} from '@core';


type Props = {
	viewport: HTMLCanvasElement;
	core: Core;
}

export function App({viewport, core}: Props): React.ReactElement {
	const [modal, setModal] = useState<React.ReactElement>();
	const [message, setMessage] = useState<string>();

	const container = useRef<HTMLDivElement>(null);

	viewport.className = styles.viewport;

	window.addEventListener('resize', () => {core.updateViewportSize();});

	useEffect(() => {
		if (container.current) {
			container.current.appendChild(viewport);
			core.updateViewportSize();
		}
	});

	const style = core.getStyle();

	return (
		<Context.Provider value={{
			core,
			modal,
			setModal,
			message,
			setMessage,
		}}>
			<div
				ref={container}
				className={styles.container}
				data-theme={style.getTheme().key}
			>
				<ModalLayer/>
				<InterfaceLayer/>
			</div>
		</Context.Provider>
	);
}
