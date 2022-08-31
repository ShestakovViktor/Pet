/*
import Mode from '../mode.js';
import SelectObjectAction from '../actions/SelectObjectAction.js';

export default function SelectObjectMode({
	engine,
	manager,
	project,
	selected,
}) {
	let initialMouseEvent;

	function mouseDown(mouseEvent) {
		if (mouseEvent.button === 0) {
			initialMouseEvent = mouseEvent;
		}
	}

	function mouseMove(mouseEvent) {
		if (mouseEvent.button === 0) {
			engine.dl.clearRect(0, 0, engine.overlay.width, engine.overlay.height);
			engine.dl.setLineDash([10, 15]);
			engine.dl.beginPath();

			engine.dl.strokeStyle = 'white';
			engine.dl.rect(
				initialMouseEvent.offsetX,
				initialMouseEvent.offsetY,
				mouseEvent.offsetX - initialMouseEvent.offsetX,
				mouseEvent.offsetY - initialMouseEvent.offsetY
			);
			engine.dl.stroke();
		}
	}

	function mouseUp(mouseEvent) {
		if (mouseEvent.button === 0) {
			manager.execute(
				SelectObjectAction({
					storage: selected,
					objects: engine.pick({
						set: project.scene,
						point: initialMouseEvent,
						point2: mouseEvent,
					}),
				})
			);

			engine.dl.clearRect(0, 0, engine.overlay.width, engine.overlay.height);
			initialMouseEvent = undefined;
		}
	}

	return Object.freeze(
		Object.assign({}, Mode(), {
			mouseDown,
			mouseUp,
			mouseMove,
		})
	);
}

*/