import { Model, LinkGroup, Link } from "./model/model"
import { View } from "./view/view"
import { Controller } from "./controller/controller"

const _global = <any>window;

var app: App | null

_global.initLinkjump = function() {
	app = new App()
}

_global.group = function(groupName: string, links: Link[]) {
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

	addGroup(linkGroup: LinkGroup) {
		this.model.addGroup(linkGroup)
	}
}

