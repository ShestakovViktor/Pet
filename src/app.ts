/* eslint-disable @typescript-eslint/no-unused-vars */
import {Core} from '@core';
import {Gui} from '@gui';

const canvas = <HTMLCanvasElement>document.createElement('CANVAS');

const core = new Core(canvas);
const gui = new Gui(canvas, core);