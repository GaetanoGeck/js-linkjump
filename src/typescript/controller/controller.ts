// Controller

import { Config } from "./config"
import { Model, Link } from "../model/model"
import { Filter } from "../model/filter"
import { View, ViewObserver } from "../view/view"

export class Controller extends ViewObserver {
	model: Model
	view: View
	config: Config

	constructor(model: Model, view: View) {
		super()
		this.model = model
		this.view = view
		this.config = new Config()

		view.observe(this)
	}

	onCommandChanged(command: string): void {
		console.log(`Command changed: ${command}`)
		const filter = new Filter(command)
		this.model.filter(filter)
		if (this.config.hurry) {
			this.hurry()
		}
	}

	private hurry() {
		const matches = this.model.matchingLinks
		if (matches.length == 1) {
			var uniqueLink = matches[0]
			this.onOpenLink(uniqueLink)
		}
	}

	onEnter(): void {
		const visibleLinks = this.model.visibleLinks()
		if (visibleLinks.length > 0) {
			const selectedLink = visibleLinks[0]
			this.onOpenLink(selectedLink)
		}
	}

	onOpenLink(link: Link) {
		window.open(link.href, "_self")
	}

}
