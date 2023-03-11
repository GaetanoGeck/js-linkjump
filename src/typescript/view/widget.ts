import { LinkGroup, Link } from "../model/model"

export function createLinkGroup(linkGroup: LinkGroup): HTMLElement {
	const elem = document.createElement("div")
	elem.id = linkGroup.id
	elem.classList.add("card", "m-3")
	elem.appendChild(createCardHeader())
	elem.appendChild(createCardBody())
	return elem

	function createCardHeader(): HTMLElement {
		const headerElem = document.createElement("div")
		headerElem.classList.add("card-header")
		headerElem.innerText = linkGroup.name
		return headerElem
	}

	function createCardBody(): HTMLElement {
		const bodyElem = document.createElement("div")
		bodyElem.classList.add("card-body")
		bodyElem.appendChild(createGroupListElement(linkGroup))
		return bodyElem
	}
}

function createGroupListElement(linkGroup: LinkGroup): HTMLElement {
	const elem = document.createElement("ul")
	elem.classList.add("LinkGroup")
	const links = linkGroup.links.map(x => createLinkElement(x))
	links.forEach(x => elem.appendChild(x))
	return elem
}

function createLinkElement(link: Link): HTMLElement {
	const li = document.createElement("li")
	const a = document.createElement("a")
	a.id = link.id
	a.classList.add("Link")
	a.innerText = link.label
	a.href = link.href
	li.appendChild(a)
	return li
}
