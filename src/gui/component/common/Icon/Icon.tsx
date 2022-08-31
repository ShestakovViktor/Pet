import React from 'react';
import {glyphs} from '@gui/resource/glyphs';
import styles from './Icon.m.css';

type Props = {
	glyph: keyof typeof glyphs;
}

export function Icon(props: Props): React.ReactElement {
	const glyph = glyphs[props.glyph];

	const path = (<path className={styles.path} d={glyph}></path>);

	return (<svg className={styles.icon} viewBox='0 0 24 24'>{path}</svg>);
}
