import React from 'react';
import {Button, Dialog} from '@gui/component/common';

export function ProjectDialog(): React.ReactElement {
	function onclick(): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.click();
		input.addEventListener('change', () => {
			/*
			const file = input.files[0];

			const reader = new FileReader();
			reader.addEventListener('load', () => {
				vnode.attrs.core.project.load(reader.result);
			});
			reader.readAsText(file);
			*/
		});

	}

	return (
		<Dialog title='Project'>
			<textarea></textarea>
			<Button icon='folder' onClick={(): void => onclick()}/>
		</Dialog>
	);
}

/*
		m(Button, {
			icon: 'folder',
			onclick() {
				console.log(this);
				m.render(
					this,
					m('input', { id: 'file-upload', type: 'file', hidden: true })
				);
				//document.querySelector('#file-upload').click();
			},
		}),
		*/
