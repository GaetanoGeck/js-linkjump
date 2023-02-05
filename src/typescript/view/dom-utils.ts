// Utilities for DOM operations

export function getHtmlElement(id: string): HTMLElement {
	return <HTMLElement> document.getElementById(id)
}

export function getHtmlInputElement(id: string): HTMLInputElement {
	return <HTMLInputElement> document.getElementById(id)
}

export function registerOnInput(elem: HTMLInputElement, action: () => void) {
	elem.oninput = action
}

