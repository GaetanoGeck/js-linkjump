# Linkjump

The development of this tool was motivated by the desire to choose the right link from a larger collection by filtering the collection with a keyboard query.

Links have
1. a URL and
2. a label and, optionally,
3. a command.

The URL defines the jump target, the label is used when displaying the filtered collection. The command is _not_ displayed but can simplify the access to a specific link.

Links can be grouped.

## Usage

First, configure `app/links.js` to contain the links you're interested in. Then, open the file `app/index.html`. You're ready to jump … 

Only those links are shown that match *all* parts of the query. Link _groups_ that contain no matching link are hidden.
Each query part is matched against the label, the URL, the command and the group name of the link such that if any matches, the link matches.

There are two types of parts that are matched in a restricted fashion only:
- group queries, starting with a dot, like `.wiki`; and
- command queries, starting with a hash, like `#wp`.

The latter are matched against the link command only and the former against the name of the group of the link.

## Example configuration

By changing the contents of `app/links.js`, you can configure the groups and links displayed. The following excerpt shows the contents of the example file provided in this repository. This file defines two groups containing three and two links, respectively.

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

## URL parameters

The behaviour of the application be configured via URL parameters.

Currently, the following parameters are understood:
- `query`: start with links filtered according to the query
- `hurry`: open link, if only a single links is shown

The query parameter is particularly useful in combination with user-defined "search engines" in your browser. In _Chrome_, for instance, you can add an URL like the following with a shortcut like `lj`.

```
file:///SOMEWHERE_ON_YOUR_DISK/js-linkjump/app/index.html?query=%s
```

Or even, 

```
file:///SOMEWHERE_ON_YOUR_DISK/js-linkjump/app/index.html?query=%s&hurry
```

when you want option `hurry` to be active.
