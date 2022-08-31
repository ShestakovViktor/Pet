import React, {useState} from 'react';
import styles from './Tree.m.css';

type Node = {
	title: string;
	children?: Node[];
}
type Props = {
	node: Node;
	lvl?: number;
	onclick?: (selected: any) => void;
}

const MARK = '\u2022';
const DOT = '\u22A1';
const PLUS = '\u229E';
const MINUS = '\u229F';

export function Tree(props: Props): React.ReactElement {
	const [isCollapsed, setCollapsed] = useState(false);

	function titleOnclick(event: React.MouseEvent): void {
		event.stopPropagation();

		if (props.node.children) {
			setCollapsed(!isCollapsed);
		}
		else if (props.onclick) {
			props.onclick(props.node);
		}
	}

	const {title, children: children} = props.node;
	const {onclick, lvl = 0} = props;

	const type = !lvl ? 'root' : !children ? 'leaf' : 'branch';
	const prefix = !lvl ? DOT : !children ? MARK : isCollapsed ? PLUS : MINUS;

	const nodes = !isCollapsed && children?.map((node, ind) =>
		<Tree key={ind} node = {node} lvl = {lvl + 1} onclick = {onclick}/>
	);

	return (
		<div className={`${styles.node} ${styles[type]}`}>
			<div className={styles.span}>{prefix}</div>
			<div className={styles.title} onClick={titleOnclick}>{title}</div>
			<div className={styles.content}>{nodes}</div>
		</div>
	);
}
