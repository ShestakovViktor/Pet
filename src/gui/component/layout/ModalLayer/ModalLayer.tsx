import React, {useContext} from 'react';
import styles from './ModalLayer.m.css';
import {Context} from '@gui/Context';

export function ModalLayer(): React.ReactElement {
	const context = useContext(Context);

	function clear(e: React.MouseEvent): void {
		const target = e.target as HTMLDivElement;
		if (target.className === styles.modalLayer) context.setModal(undefined);
	}

	return (
		<div className={styles.modalLayer} onClick={clear}>
			{context.modal}
		</div>
	);
}