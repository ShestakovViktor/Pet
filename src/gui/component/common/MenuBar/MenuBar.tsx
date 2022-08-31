import React from 'react';
import styles from './MenuBar.m.css';

export type MenubarData = {
	title: string;
	children: {
		name: string;
		onclick?: () => void;
	}[];
}[];


type Props = {
	data: MenubarData;
}

export function MenuBar(props: Props): React.ReactElement {
	const {data} = props;

	const items = data.map((item, ind) => {
		const onclick = function(event: React.MouseEvent): void {
			event.stopPropagation();
			if (event.target instanceof Element) {
				event.target.parentElement?.classList.toggle(styles.open);
			}
		};

		const options = item.children.map((option, index) => {

			const optionOnClick = function (event: React.MouseEvent): void {
				event.stopPropagation();
				if (option.onclick) option.onclick();
			};

			return (
				<div
					key={index}
					className={styles.option}
					onClick={optionOnClick}>
					{option.name}
				</div>
			);
		});

		return (
			<div className={styles.dropdown} key={ind}>
				<div
					className={styles.title}
					onClick={onclick}
				>
					{item.title}
				</div>
				<div className={styles.list}>{options}</div>
			</div>
		);
	});

	return (<div className={styles.menubar}>{items}</div>);
}
