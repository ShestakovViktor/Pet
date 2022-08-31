import React from 'react';
import styles from './ProjectTree.m.css';
import {Tree} from '@gui/component/common';

const foo = {
	title: 'object1',
	children: [
		{
			title: 'object2.1',
			children: [

				{title: 'object2.1.1'},
				{title: 'object2.1.2'},
				{title: 'object2.1.3'},
			],
		},
		{
			title: 'object2.2',
			children: [
				{title: 'object2.2.1'},
				{title: 'object2.2.2'},
			],
		},
	],

};

export function ProjectTree(): React.ReactElement {
	return (
		<div className={styles.projectTree}>
			<Tree node={foo}/>
		</div>
	);
}
/*
import m from 'mithril';
import Tree from '../common/tree.js';
import Icon from '../common/icon.js';
import AddObjectAction from '../../../core/actions/add-object-action.js';

export default function PaletteMenu() {
	return Object.freeze({
		view({ attrs: { core } }) {
			return m(Tree, {
				model: core.palette.hierarchy(),
				content,
				params: { core },
			});
		},
	});
}

function content(model, name) {
	const node = model[name];

	if (Array.isArray(node)) {
		return {
			view({ attrs: { model, name, core } }) {
				return m(Icon, {
					glyph: 'download',
					async onclick() {
						core.palette.foo(model, name, m, core.engine);
					},
				});
			},
		};
	} else if (typeof node === 'string') {
		return {
			view({ attrs: { model, name, core } }) {
				return m(Icon, {
					glyph: 'download',
					async onclick() {
						core.manager.execute(
							AddObjectAction({
								modelHash: model[name],
								palette: core.palette,
								engine: core.engine,
								project: core.project,
							})
						);
					},
				});
			},
		};
	}
}
*/