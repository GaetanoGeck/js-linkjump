import { View } from "./view"
import { LinkGroup, Link } from "../model/model"

export function createLinkGroup(view: View, linkGroup: LinkGroup): HTMLElement {
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
		bodyElem.appendChild(createGroupListElement(view, linkGroup))
		return bodyElem
	}
}

function createGroupListElement(view: View, linkGroup: LinkGroup): HTMLElement {
	const elem = document.createElement("div")
	elem.role = "group"
	elem.classList.add( //
		"btn-group-vertical", //
		"btn-group-sm")
	const links = linkGroup.links.map(x => createLinkElement(view, x))
	links.forEach(x => elem.appendChild(x))
	return elem
}

function createLinkElement(view: View, link: Link): HTMLElement {
	const elem = document.createElement("button")
	elem.id = link.id
	elem.type = "button"
	elem.classList.add("btn", "Link")
	elem.innerText = `〉${link.label}`
	elem.onclick = () => view.openLink(link)
	elem.title = `Jump to ${link.href}`
	return elem
}
