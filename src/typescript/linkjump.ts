import { Model, LinkGroup, Link } from "./model/model"
import { View } from "./view/view"
import { Controller } from "./controller/controller"

const _global = <any>window;

var app: App | null

_global.initLinkjump = function() {
	app = new App()
}

_global.startApp = function() {
	app!.start()
}

_global.group = function(groupName: string, links: Link[]): void {
	const linkGroup = new LinkGroup(groupName, links)
	app!.addGroup(linkGroup)
}

_global.link = function(label: string, href: string, command: string = ""): Link {
	return new Link(label, href, command)
}

class App {
	model: Model
	view: View
	controller: Controller

	constructor() {
		this.model = new Model([])
		this.view = new View()
		this.model.observe(this.view)
		this.controller = new Controller(this.model, this.view)
	}

	start() {
		const query = urlParameter("query")
		if (query !== null) {
			this.view.changeCommand(query)
		}
	}

	addGroup(linkGroup: LinkGroup): void {
		this.model.addGroup(linkGroup)
	}

}

function urlParameter(key: string): string | null {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(key)
}
