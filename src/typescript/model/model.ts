// Model

import { Filter } from "./filter"

export class Model {
	linkGroups: LinkGroup[]
	observers: ModelObserver[] = []

	constructor(linkGroups: LinkGroup[]) {
		this.linkGroups = linkGroups
	}

	observe(observer: ModelObserver): void {
		this.observers.push(observer)
	}

	addGroup(group: LinkGroup): void {
		console.log(`Adding link group "${group.name}"`)
		this.linkGroups.push(group)
		this.observers.forEach(obs => obs.onLinkGroupAdd(group))
	}

	visibleLinks(): Link[] {
		return this.allLinks().filter(link => link.matchesFilter)
	}

	private allLinks(): Link[] {
		return this.linkGroups.flatMap(lg => lg.links)
	}

	filter(f: Filter): void {
		this.linkGroups.forEach(g => this.filterGroup(f, g))
		this.observers.forEach(obs => obs.onFilter(this.linkGroups))
	}

	private filterGroup(f: Filter, group: LinkGroup): void {
		group.links.forEach(link => this.filterLink(f, link, group))
		const hasMatchingLinks = group.links.some(link => link.matchesFilter)
		group.matchesFilter = hasMatchingLinks
	}

	private filterLink(f: Filter, link: Link, group: LinkGroup): boolean {
		link.matchesFilter = f.matches(link, group)
		return link.matchesFilter
	}

}

export abstract class ModelObserver {
	abstract onLinkGroupAdd(linkGroup: LinkGroup): void
	abstract onFilter(linkGroups: LinkGroup[]): void
}

export class LinkGroup {
	static count = 1

	id: string
	name: string
	links: Link[]
	matchesFilter: boolean = true

	constructor(name: string, links: Link[]) {
		this.id = `group-${LinkGroup.count++}`
		this.name = name
		this.links = links
	}
}

export class Link {
	static count = 1

	id: string
	label: string
	href: string
	command: string
	matchesFilter: boolean = true

	constructor(label: string, href: string, command: string = "") {
		this.id = `link-${Link.count++}`
		this.label = label
		this.href = href
		this.command = command
	}
}

