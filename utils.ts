import { chromium } from "playwright";

const fetchWebsite = async () => {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	const ft = await page.goto("https://archive.is/6PWTQ");
	const content = await ft?.body();
	await browser.close();
	const articleRaw = Buffer.from(content).toString();
	// const articleDOM = new JSDOM(articleRaw);
	// const article = new Readability(articleDOM.window.document).parse()
	// 	?.content;
	await Bun.write("article.txt", articleRaw);
};
