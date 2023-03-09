// View

import * as dom from "./dom-utils"
import * as widget from "./widget"
import { ModelObserver, LinkGroup, Link } from "../model/model"

export class View extends ModelObserver {
	command: HTMLInputElement
	status: HTMLElement
	linkGroups: HTMLElement
	observers: ViewObserver[] = []

	statisticsAll = new Statistics()
	statisticsFiltered = new Statistics()

	constructor() {
		super()
		this.command = dom.getHtmlInputElement("Command")
		this.status = dom.getHtmlElement("Status")
		this.linkGroups = dom.getHtmlElement("LinkGroups")
		this.command.oninput = () => this.onCommandChanged()
		this.command.onkeyup = (e: KeyboardEvent) => this.onKeyUp(e)
		this.updateStatus()
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

	changeCommand(command: string): void {
		this.command.value = command
		this.onCommandChanged()
	}

	onCommandChanged(): void {
		const command = this.command.value
		this.observers.forEach(x => x.onCommandChanged(command))
	}

	onLinkGroupAdd(linkGroup: LinkGroup): void {
		const linkGroupRep = widget.createLinkGroup(this, linkGroup)
		this.linkGroups.appendChild(linkGroupRep)
		this.statisticsAll.addLinkGroup(linkGroup)
		this.statisticsFiltered.addLinkGroup(linkGroup)
		this.updateStatus()
	}

	onFilter(linkGroups: LinkGroup[]): void {
		this.statisticsFiltered.reset()
		linkGroups.forEach(g => this.filterGroup(g))
		this.updateStatus()
	}

	private filterGroup(linkGroup: LinkGroup): void {
		const linkGroupElem = dom.getHtmlElement(linkGroup.id)
		if (linkGroup.matchesFilter) {
			this.statisticsFiltered.numberOfGroups++
		}
		linkGroupElem.hidden = !linkGroup.matchesFilter
		linkGroup.links.forEach(link => this.filterLink(link))
	}

	private filterLink(link: Link): void {
		const linkElem = dom.getHtmlElement(link.id)
		if (link.matchesFilter) {
			this.statisticsFiltered.numberOfLinks++
		}
		linkElem.hidden = !link.matchesFilter
	}

	private updateStatus(): void {
		const statusLinks = this.statusLinks()
		const statusGroups = this.statusGroups()
		this.status.innerText = `Showing ${statusLinks} in ${statusGroups}`;

	}

	private statusLinks(): string {
		const numAllLinks = this.statisticsAll.numberOfLinks
		const numFilteredLinks = this.statisticsFiltered.numberOfLinks
		return (numFilteredLinks == numAllLinks)
			? `all of ${numAllLinks} links`
			: `${numFilteredLinks} of ${numAllLinks} links`
	}

	private statusGroups(): string {
		const numAllGroups = this.statisticsAll.numberOfGroups
		const numFilteredGroups = this.statisticsFiltered.numberOfGroups

		return (numFilteredGroups == numAllGroups)
			? `all of ${numAllGroups} groups`
			: `${numFilteredGroups} of ${numAllGroups} groups`
	}
}

export abstract class ViewObserver {
	abstract onOpenLink(link: Link): void
	abstract onCommandChanged(command: string): void
	abstract onEnter(): void
}

class Statistics {
	numberOfLinks = 0
	numberOfGroups = 0

	reset(): void {
		this.numberOfLinks = 0
		this.numberOfGroups = 0
	}

	addLinkGroup(linkGroup: LinkGroup): void {
		this.numberOfGroups++
		this.numberOfLinks += linkGroup.links.length
	}
}
