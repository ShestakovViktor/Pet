//import {Context} from '@gui/Context';
import React, {/*useContext,*/ useState} from 'react';
import styles from './FpsMonitor.m.css';

export function FpsMonitor(): React.ReactElement {
	//const {core} = useContext(Context);
	const [fps, setFps] = useState<number>();

	setInterval(() => {
		setFps(/*core.getFps()*/0);
	}, 1000);

	return (<div className={styles.fpsMonitor}>Fps: {fps}</div>);
}