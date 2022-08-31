declare module '*.vert' {
	const content: any;
	export default content;
}

declare module '*.frag' {
	const content: any;
	export default content;
}

declare module '*.m.css' {
	const content: { [key: string]: string };
	export default content;
}

declare module '*.css' {
	const content: any;
	export default content;
}

