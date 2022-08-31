import {Settings, Dictionary} from '.';

export type Locale = {
	name: string;
	settings: Settings;
	dictionary: Dictionary<string>;
}