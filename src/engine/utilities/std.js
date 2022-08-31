export function hexToRgb(str) {
	return Float32Array.from(str.match(/[^#]{2}/g).map((v) => parseInt(v, 16)));
}
