// Filter

import { Link, LinkGroup } from "./model"

export class Filter {
	commands: string[]
	groups: string[]
	keys: string[]

	constructor(query: string) {
		const parts = query.split(" ")
		this.commands = filterCommand(parts)
		this.groups = filterGroups(parts)
		this.keys = filterKeys(parts)
	}

	matches(link: Link, group: LinkGroup): boolean {
		return this.matchesCommand(link)
			&& this.matchesGroups(group)
			&& this.matchesKeys(link, group);
	}

	private matchesCommand(link: Link): boolean {
		const command = link.command.toLowerCase()
		return this.commands.every(c => matches(c))

		function matches(queryCommand: string): boolean {
			return command.startsWith(queryCommand.toLowerCase())
		}
	}

	private matchesGroups(group: LinkGroup): boolean {
		const groupName = group.name.toLowerCase()
		return this.groups.every(g => matches(g));

		function matches(queryGroupName: string): boolean {
			return groupName.includes(queryGroupName.toLowerCase())
		}
	}

	private matchesKeys(link: Link, group: LinkGroup): boolean {
		const command = link.command.toLowerCase()
		const label = link.label.toLowerCase()
		const groupName = group.name.toLowerCase()
		const href = link.href.toLowerCase()
		return this.keys.every(k => matches(k))

		function matches(queryKey: string): boolean {
			const key = queryKey.toLowerCase()
			return label.includes(key)
				|| groupName.includes(key)
				|| command.includes(key)
				|| href.includes(key)
		}
	}
}

function filterCommand(parts: string[]): string[] {
	return parts.filter(s => s.startsWith("#"))
		.map(s => s.substring(1).trim())
}

function filterGroups(parts: string[]): string[] {
	return parts.filter(s => s.startsWith("."))
		.map(s => s.substring(1).trim())
}

function filterKeys(parts: string[]): string[] {
	return parts.filter(s => !s.startsWith("#") && !s.startsWith("."))
		.map(s => s.trim())
}
