
/*
export default function Palette(engine) {
	const identityMap = {};
	let tree = {};

	loadStatic('./models/hierarchy.json').then((data) => {
		tree = JSON.parse(data);
	});

	async function test(uid) {
		if (!identityMap.hasOwnProperty(uid) && !identityMap[uid]) {
			const geometry = JSON.parse(await loadStatic(`./models/${uid}.json`));

			const model = engine.createModel(geometry);
			model.uid = uid;
			identityMap[uid] = model;
		}
	}

	function loadStatic(url) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.addEventListener('load', function() {
				if (this.status >= 200 && this.status < 300) {
					resolve(this.response);
				} else {
					reject({
						status: this.status,
						statusText: this.statusText,
					});
				}
			});
			xhr.addEventListener('error', function() {
				reject({
					status: this.status,
					statusText: this.statusText,
				});
			});
			xhr.send();
		});
	}

	function hierarchy() {
		return tree;
	}

	function foo(branch, leafName, m, engine) {
		const uids = branch[leafName];
		branch[leafName] = {};

		uids.forEach((uid) => {
			loadStatic(`./models/${uid}.json`).then((data) => {
				const geometry = JSON.parse(data);
				branch[leafName][geometry.name] = geometry.uid;
				const model = engine.createModel(geometry);
				model.uid = uid;
				identityMap[uid] = model;
				m.redraw();
			});
		});
	}
	return Object.freeze({ hierarchy, foo, identityMap, test });
}

/*
function hashFnv32a(str, asString, seed) {
	let hval = seed === undefined ? 0x811c9dc5 : seed;
	for (let i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		// 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
		// Using bitshift for accuracy and performance. Numbers in JS suck.
		hval +=
			(hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	if (asString) {
		// Convert to 8 digit hex string
		return ('0000000' + (hval >>> 0).toString(16)).substr(-8);
	}
	return hval >>> 0;
}

*/