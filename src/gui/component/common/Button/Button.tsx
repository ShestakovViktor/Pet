import React, {useContext} from 'react';
import {Icon} from '@gui/component/common';
import {glyphs} from '@gui/resource/glyphs';
import styles from './Button.m.css';
import {Context} from '@gui/Context';

type Props = {
	tooltip?: string;
	icon: keyof typeof glyphs;
	onClick?: () => void;
}

export function Button(props: Props): React.ReactElement {
	const {setMessage} = useContext(Context);
	let timer: NodeJS.Timeout;

	function onMouseOver(): void {
		timer = setTimeout(() => {
			setMessage(props.tooltip);
		}, 0);
	}

	function onMouseOut(): void {
		clearTimeout(timer);
		setMessage('');
	}

	return (
		<div
			className={styles.button}
			onClick={props.onClick}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			<Icon glyph={props.icon}/>
		</div>
	);
}
