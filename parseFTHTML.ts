import { JSDOM } from "jsdom";
// const file = Bun.file("ft.html");
// const text = await file.text();

// const ftContentRegex = /https:\/\/ft\.com\/content\/[a-f0-9-]+/g;
// const matchedArticleURLs = text.match(ftContentRegex);
// Bun.write("article_urls.txt", matchedArticleURLs);

const trimString = (text: string) => {
	return text
		.split("")
		.filter((e) => e !== "\t" && e !== "\n")
		.join("");
};

const validateAndTrimString = (text: string | null, placeholder: string) => {
	if (text) {
		return trimString(text);
	}
	return `No ${placeholder} found`;
};

const file = Bun.file("ft_rss.html");
const text = await file.text();

const rssDOM = new JSDOM(text);
const articlesCollection =
	rssDOM.window.document.getElementsByClassName("o-teaser__content");
const articlesArray: Element[] = Array.prototype.slice.call(articlesCollection);

const extractedArticles = articlesArray.map((e) => {
	const articleHeader = e.getElementsByClassName("js-teaser-heading-link")[0];
	const articleTitle = articleHeader.textContent;
	const articleLink = articleHeader.getAttribute("href");
	const articleCategory =
		e.getElementsByClassName("o-teaser__tag")[0].textContent;
	const articleSubtext = e.getElementsByClassName(
		"js-teaser-standfirst-link",
	)[0].textContent;

	const trimmedArticleTitle = validateAndTrimString(articleTitle, "title");

	const trimmedArticleSubtext = validateAndTrimString(
		articleSubtext,
		"subtext",
	);

	const trimmedArticleCategory = validateAndTrimString(
		articleCategory,
		"category",
	);

	console.log(trimmedArticleCategory);
	console.log(trimmedArticleTitle);
	console.log(trimmedArticleSubtext);
	console.log(articleLink);
	console.log("---------------------------------------");
});
