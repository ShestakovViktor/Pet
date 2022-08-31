import React, {useContext, useEffect, useRef} from 'react';
import styles from './Editor.m.css';

import {ModalLayer, InterfaceLayer} from '@gui/component/layout';
import {Context} from '@gui';

export function Editor(): React.ReactElement {
	const {core, style} = useContext(Context);
	const container = useRef<HTMLDivElement>(null);

	const viewport = core.getViewport();
	viewport.className = styles.viewport;

	window.addEventListener('resize', () => {core.updateViewport();});

	useEffect(() => {
		if (container.current) {
			container.current.appendChild(viewport);
			core.updateViewport();
		}
	});

	return (
		<div
			ref={container}
			className={styles.container}
			data-theme={style.getTheme().key}
		>
			<ModalLayer/>
			<InterfaceLayer/>
		</div>
	);

}
