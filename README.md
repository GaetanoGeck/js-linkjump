# Linkjump


The development of this tool was motivated by the desire to choose the right link from a larger collection by filtering the collection with a keyboard query.

Links have a (of course) a URL and a label where the former is need to jump to right location eventually and the latter is used when displaying the filtered collection. Links can be grouped and also assigned a "command".

## Usage

Just open the file `app/index.html` after configuring `app/links.js` to contain the links you're interested in.

The query can consist of multiple parts, separted by spaces. The links are filtered such that only those remain that match *all* parts. Only link groups with matching links are displayed. Each part is matched against the label, the URL, the command and the group name of the link such that if any matches, the link matches.

There are two types of parts that are matched in a restricted fashion only:
- group queries, starting with a dot, like `.wiki`; and
- command queries, starting with a hash, like `#wp`.
The latter are matched against the link command only and the former against the name of the group of the link.

## Example configuration

By changing the contents of `app/links.js`, you can configure the groups and links displayed. The following excerpt shows the contents of the example file provided in this repository. This file defined two groups containing three and two links, respectively.

```
group("Wikipedia", [
	link("English", "https://en.wikipedia.org", "wp"),
	link("French", "https://fr.wikipedia.org", "wpfr"),
	link("German", "https://de.wikipedia.org", "wpde"),
]);

group("News", [
	link("The Guardian", "https://www.theguardian.com/international"),
	link("The New York Times", "https://www.nytimes.com/"),
]);
```

