import { Filter } from "./filter"
import { Link, LinkGroup } from "./model"

const wpDE = new Link("German Wikipedia", "https://de.wikipedia.org", "wpde")
const wpEN = new Link("English Wikipedia", "https://en.wikipedia.org", "wpen")
const wp = new LinkGroup("Wikipedia (online encyclopedia)", [wpDE, wpEN])

const angular = new Link("Angular", "https://angular.io")
const react = new Link("React", "https://reactjs.org")
const js = new LinkGroup("JS-Frameworks", [angular, react])

describe("matches empty", () => {
	it.each([
		[""],
		[" "],
		["   "]
	])("matches every group and link if empty", (query: string) => {
		const f = new Filter(query)

		expect(f.matches(wpDE, wp)).toBeTruthy()
		expect(f.matches(wpEN, wp)).toBeTruthy()
	})
})

describe("matches by query", () => {
	it("matches Wikipedia links with query prefix", () => {
		const f = new Filter("#wp")

		expect(f.matches(wpDE, wp)).toBeTruthy()
		expect(f.matches(wpEN, wp)).toBeTruthy()
		expect(f.matches(angular, js)).toBeFalsy()
		expect(f.matches(react, js)).toBeFalsy()
	})

	it("matches English Wikipedia link with exact query", () => {
		const f = new Filter("#wpen")

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeTruthy()
		expect(f.matches(angular, js)).toBeFalsy()
		expect(f.matches(react, js)).toBeFalsy()
	})

	it("matches no links when query not prefix", () => {
		const f = new Filter("#en")

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeFalsy()
		expect(f.matches(angular, js)).toBeFalsy()
		expect(f.matches(react, js)).toBeFalsy()
	})

	it.each([
		["wp"],
		["WP"]
	])("matches key", (query: string) => {
		const f = new Filter(query)

		expect(f.matches(wpDE, wp)).toBeTruthy()
		expect(f.matches(wpEN, wp)).toBeTruthy()
		expect(f.matches(angular, js)).toBeFalsy()
		expect(f.matches(react, js)).toBeFalsy()
	})
})

describe("matches by label", () => {
	it.each([
		["ish"],
		["English"],
		["english"]
	])("matches only English wikipedia unambiguous key", (query: string) => {
		const f = new Filter(query)

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeTruthy()
	})
})

describe("matches by group", () => {
	it.each([
		["js"],
		["JS"],
		["frame"],
		["framework"]
	])("matches keys", (query: string) => {
		const f = new Filter(query)

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeFalsy()
		expect(f.matches(angular, js)).toBeTruthy()
		expect(f.matches(react, js)).toBeTruthy()
	})
	
	it.each([
		[".js"],
		[".JS"],
		[".frame"],
		[".framework"]
	])("matches groups", (query: string) => {
		const f = new Filter(query)

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeFalsy()
		expect(f.matches(angular, js)).toBeTruthy()
		expect(f.matches(react, js)).toBeTruthy()
	})
})

describe("matches by href", () => {
	it("matches io", () => {
		const f = new Filter("io")

		expect(f.matches(wpDE, wp)).toBeFalsy()
		expect(f.matches(wpEN, wp)).toBeFalsy()
		expect(f.matches(angular, js)).toBeTruthy()
		expect(f.matches(react, js)).toBeFalsy()
	})
})
