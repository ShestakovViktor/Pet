/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, {useState} from 'react';
import styles from './Select.m.css';

type Props<T = {[key: string]: any}> = {
	property: string;
	options: T[];
	selected?: T;
	onClick?: (selected: any) => void;
}

const ROOT = '\u22A1';
const PLUS = '\u229E';

export function Select(props: Props): React.ReactElement {
	const [isOpen, setOpen] = useState(false);
	const [select, setSelected] = useState(
		props.selected ?? {[props.property]: 'Undefined'}
	);

	const options = isOpen && props.options.map((value, index) => {
		function select(): void {
			setSelected(value);
			setOpen(false);
			if (props.onClick) props.onClick(value);
		}

		return (
			<div key={index} className={styles.option} onClick={select}>
				{value[props.property]}
			</div>
		);
	});

	const placeholder = new String(select[props.property]);
	const icon = isOpen ? ROOT : PLUS;
	function open(): void { setOpen(!isOpen); }

	return (
		<div className={styles.select}>
			<div className={styles.input} onClick={open}>{placeholder}</div>
			<div className={styles.button} onClick={open}>{icon}</div>
			<div className={styles.list}>{options}</div>
		</div>
	);
}
