(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// Controller
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const filter_1 = require("../model/filter");
const view_1 = require("../view/view");
class Controller extends view_1.ViewObserver {
    constructor(model, view) {
        super();
        this.model = model;
        this.view = view;
        view.observe(this);
    }
    onCommandChanged(command) {
        // TODO
        console.log(`Command changed: ${command}`);
        const filter = new filter_1.Filter(command);
        this.model.filter(filter);
    }
}
exports.Controller = Controller;

},{"../model/filter":3,"../view/view":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model/model");
const view_1 = require("./view/view");
const controller_1 = require("./controller/controller");
const _global = window;
var app;
_global.initLinkjump = function () {
    app = new App();
};
_global.group = function (groupName, links) {
    const linkGroup = new model_1.LinkGroup(groupName, links);
    app.addGroup(linkGroup);
};
_global.link = function (label, href, command = "") {
    return new model_1.Link(label, href, command);
};
class App {
    constructor() {
        this.model = new model_1.Model([]);
        this.view = new view_1.View();
        this.model.observe(this.view);
        this.controller = new controller_1.Controller(this.model, this.view);
    }
    addGroup(linkGroup) {
        this.model.addGroup(linkGroup);
    }
}

},{"./controller/controller":1,"./model/model":4,"./view/view":6}],3:[function(require,module,exports){
"use strict";
// Filter
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
class Filter {
    constructor(query) {
        const parts = query.split(" ");
        this.commands = filterCommand(parts);
        this.groups = filterGroups(parts);
        this.keys = filterKeys(parts);
    }
    matches(link, group) {
        return this.matchesCommand(link)
            && this.matchesGroups(group)
            && this.matchesKeys(link, group);
    }
    matchesCommand(link) {
        const command = link.command.toLowerCase();
        return this.commands.every(c => matches(c));
        function matches(queryCommand) {
            return command.startsWith(queryCommand.toLowerCase());
        }
    }
    matchesGroups(group) {
        const groupName = group.name.toLowerCase();
        return this.groups.every(g => matches(g));
        function matches(queryGroupName) {
            return groupName.includes(queryGroupName.toLowerCase());
        }
    }
    matchesKeys(link, group) {
        const command = link.command.toLowerCase();
        const label = link.label.toLowerCase();
        const groupName = group.name.toLowerCase();
        const href = link.href.toLowerCase();
        return this.keys.every(k => matches(k));
        function matches(queryKey) {
            const key = queryKey.toLowerCase();
            return label.includes(key)
                || groupName.includes(key)
                || command.includes(key)
                || href.includes(key);
        }
    }
}
exports.Filter = Filter;
function filterCommand(parts) {
    return parts.filter(s => s.startsWith("#"))
        .map(s => s.substring(1).trim());
}
function filterGroups(parts) {
    return parts.filter(s => s.startsWith("."))
        .map(s => s.substring(1).trim());
}
function filterKeys(parts) {
    return parts.filter(s => !s.startsWith("#") && !s.startsWith("."))
        .map(s => s.trim());
}

},{}],4:[function(require,module,exports){
"use strict";
// Model
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.LinkGroup = exports.ModelObserver = exports.Model = void 0;
class Model {
    constructor(linkGroups) {
        this.observers = [];
        this.linkGroups = linkGroups;
    }
    observe(observer) {
        this.observers.push(observer);
    }
    addGroup(group) {
        console.log(`Adding link group "${group.name}"`);
        this.linkGroups.push(group);
        this.observers.forEach(obs => obs.onLinkGroupAdd(group));
    }
    filter(f) {
        this.linkGroups.forEach(g => this.filterGroup(f, g));
        this.observers.forEach(obs => obs.onFilter(this.linkGroups));
    }
    filterGroup(f, group) {
        group.links.forEach(link => this.filterLink(f, link, group));
        const hasMatchingLinks = group.links.some(link => link.matchesFilter);
        group.matchesFilter = hasMatchingLinks;
    }
    filterLink(f, link, group) {
        link.matchesFilter = f.matches(link, group);
        return link.matchesFilter;
    }
}
exports.Model = Model;
class ModelObserver {
}
exports.ModelObserver = ModelObserver;
class LinkGroup {
    constructor(name, links) {
        this.matchesFilter = true;
        this.id = `group-${LinkGroup.count++}`;
        this.name = name;
        this.links = links;
    }
}
exports.LinkGroup = LinkGroup;
LinkGroup.count = 1;
class Link {
    constructor(label, href, command = "") {
        this.matchesFilter = true;
        this.id = `link-${Link.count++}`;
        this.label = label;
        this.href = href;
        this.command = command;
    }
}
exports.Link = Link;
Link.count = 1;

},{}],5:[function(require,module,exports){
"use strict";
// Utilities for DOM operations
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOnInput = exports.getHtmlInputElement = exports.getHtmlElement = void 0;
function getHtmlElement(id) {
    return document.getElementById(id);
}
exports.getHtmlElement = getHtmlElement;
function getHtmlInputElement(id) {
    return document.getElementById(id);
}
exports.getHtmlInputElement = getHtmlInputElement;
function registerOnInput(elem, action) {
    elem.oninput = action;
}
exports.registerOnInput = registerOnInput;

},{}],6:[function(require,module,exports){
"use strict";
// View
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewObserver = exports.View = void 0;
const dom = __importStar(require("./dom-utils"));
const widget = __importStar(require("./widget"));
const model_1 = require("../model/model");
class View extends model_1.ModelObserver {
    constructor() {
        super();
        this.observers = [];
        this.command = dom.getHtmlInputElement("Command");
        this.linkGroups = dom.getHtmlElement("LinkGroups");
        dom.registerOnInput(//
        this.command, //
        () => this.onCommandChanged());
    }
    observe(observer) {
        this.observers.push(observer);
    }
    onCommandChanged() {
        const command = this.command.value;
        this.observers.forEach(x => x.onCommandChanged(command));
    }
    onLinkGroupAdd(linkGroup) {
        const linkGroupRep = widget.createLinkGroup(linkGroup);
        this.linkGroups.appendChild(linkGroupRep);
    }
    onFilter(linkGroups) {
        linkGroups.forEach(g => this.filterGroup(g));
    }
    filterGroup(linkGroup) {
        const linkGroupElem = dom.getHtmlElement(linkGroup.id);
        linkGroupElem.hidden = !linkGroup.matchesFilter;
        linkGroup.links.forEach(link => this.filterLink(link));
    }
    filterLink(link) {
        const linkElem = dom.getHtmlElement(link.id);
        linkElem.hidden = !link.matchesFilter;
    }
}
exports.View = View;
class ViewObserver {
}
exports.ViewObserver = ViewObserver;

},{"../model/model":4,"./dom-utils":5,"./widget":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkGroup = void 0;
function createLinkGroup(linkGroup) {
    const elem = document.createElement("div");
    elem.id = linkGroup.id;
    elem.classList.add("card", "m-3");
    elem.appendChild(createCardHeader());
    elem.appendChild(createCardBody());
    return elem;
    function createCardHeader() {
        const headerElem = document.createElement("div");
        headerElem.classList.add("card-header");
        headerElem.innerText = linkGroup.name;
        return headerElem;
    }
    function createCardBody() {
        const bodyElem = document.createElement("div");
        bodyElem.classList.add("card-body");
        bodyElem.appendChild(createGroupListElement(linkGroup));
        return bodyElem;
    }
}
exports.createLinkGroup = createLinkGroup;
function createGroupListElement(linkGroup) {
    const elem = document.createElement("div");
    elem.role = "group";
    elem.classList.add(//
    "btn-group-vertical", //
    "btn-group-sm");
    const links = linkGroup.links.map(x => createLinkElement(x));
    links.forEach(x => elem.appendChild(x));
    return elem;
}
function createLinkElement(link) {
    const elem = document.createElement("button");
    elem.id = link.id;
    elem.type = "button";
    elem.classList.add("btn", "Link");
    elem.innerText = `〉${link.label}`;
    elem.onclick = () => window.open(link.href, "_self");
    elem.title = `Jump to ${link.href}`;
    return elem;
}

},{}]},{},[2]);