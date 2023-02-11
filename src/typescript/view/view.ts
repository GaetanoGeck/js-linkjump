// View

import * as dom from "./dom-utils"
import * as widget from "./widget"
import { ModelObserver, LinkGroup, Link } from "../model/model"

export class View extends ModelObserver {
	command: HTMLInputElement
	linkGroups: HTMLElement
	observers: ViewObserver[] = []

	constructor() {
		super()
		this.command = dom.getHtmlInputElement("Command")
		this.linkGroups = dom.getHtmlElement("LinkGroups")
		this.command.oninput = () => this.onCommandChanged()
		this.command.onkeyup = (e: KeyboardEvent) => this.onKeyUp(e)
	}

	observe(observer: ViewObserver): void {
		this.observers.push(observer)
	}

	openLink(link: Link): void {
		this.observers.forEach(x => x.onOpenLink(link))
	}

	onKeyUp(event: KeyboardEvent): void {
		if (event.key == 'Enter') {
			this.observers.forEach(x => x.onEnter())
		}
	}

	onCommandChanged(): void {
		const command = this.command.value
		this.observers.forEach(x => x.onCommandChanged(command))
	}

	onLinkGroupAdd(linkGroup: LinkGroup): void {
		const linkGroupRep = widget.createLinkGroup(this, linkGroup)
		this.linkGroups.appendChild(linkGroupRep)
	}
	
	onFilter(linkGroups: LinkGroup[]): void {
		linkGroups.forEach(g => this.filterGroup(g))
	}

	private filterGroup(linkGroup: LinkGroup): void {
		const linkGroupElem = dom.getHtmlElement(linkGroup.id)
		linkGroupElem.hidden = !linkGroup.matchesFilter
		linkGroup.links.forEach(link => this.filterLink(link))
	}

	private filterLink(link: Link): void {
		const linkElem = dom.getHtmlElement(link.id)
		linkElem.hidden = !link.matchesFilter
	}
}

export abstract class ViewObserver {
	abstract onOpenLink(link: Link): void
	abstract onCommandChanged(command: string): void
	abstract onEnter(): void
}
