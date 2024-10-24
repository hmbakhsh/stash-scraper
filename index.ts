import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

const handingerAPIKey = process.env.HANDINGER_API_KEY;
const handingerHeaders = {
	headers: { Authorization: `Bearer ${handingerAPIKey}` },
};

const constructWebscrapeURL = (url: string): string => {
	const encodedURL = encodeURIComponent(url);
	const constructedURL = `https://api.handinger.com/html?url=${encodedURL}`;
	return constructedURL;
};

const fetchFTLinks = async () => {
	const constructedURL = "https://www.ft.com/news-feed?format=rss.&page=1";
	const fetchPage: Awaited<Promise<Response>> = await fetch(
		constructedURL,
		handingerHeaders,
	);
	const pageHTML = await fetchPage.text();
	if (pageHTML) {
		const pageDOM = new JSDOM(pageHTML);
	}
};

const fetchArticle = async (url: string): Promise<void> => {
	const constructedURL = constructWebscrapeURL(url);
	const articleRaw: Awaited<Promise<Response>> = await fetch(
		constructedURL,
		handingerHeaders,
	);
	const articleBody = await articleRaw.text();
	const articleDOM = new JSDOM(articleBody);
	const article = new Readability(articleDOM.window.document).parse()
		?.textContent;
	if (articleBody) {
		await Bun.write("ft.html", articleBody);
	} else {
		console.log("No article found");
	}
};

console.log("bun app run!", process.env.HANDINGER_API_KEY);
