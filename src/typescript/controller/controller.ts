// Controller

import { Model } from "../model/model"
import { Filter } from "../model/filter"
import { View, ViewObserver } from "../view/view"

export class Controller extends ViewObserver {
	model: Model
	view: View

	constructor(model: Model, view: View) {
		super()
		this.model = model
		this.view = view

		view.observe(this)
	}

	onCommandChanged(command: string): void {
		// TODO
		console.log(`Command changed: ${command}`)
		const filter = new Filter(command)
		this.model.filter(filter)
	}
}

