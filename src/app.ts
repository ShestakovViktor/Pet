/* eslint-disable @typescript-eslint/no-unused-vars */
import {WebStorage} from '@storage';
import {I18n} from '@i18n';
import * as locales from '@i18n/locale';
import {Style} from '@style';
import * as themes from '@style/theme';
import {Engine} from '@engine';
import {Core} from '@core';
import {Gui} from '@gui';

const storage = new WebStorage();
const style = new Style(themes, {theme: storage.load('theme')});
const i18n = new I18n(locales, {language: storage.load('locale')});
const engine = new Engine();
const core = new Core(engine);
const gui = new Gui({core, i18n, style, storage});