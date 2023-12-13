const cheerio = require('cheerio');

const result = {
  emails: [],
  phones: [],
  linkedin: [],
  facebook: [],
  twitter: [],
  instagram: [],
};

const crawl = async (url, depth, maxDepth, baseUrl) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    result.emails.push(...$('a[href^="mailto:"]').map((_, element) => $(element).attr('href').replace('mailto:', '')).get());
    result.phones.push(...$('a[href^="tel:"]').map((_, element) => $(element).attr('href').replace('tel:', '')).get());
    result.linkedin.push(...$('a[href*="linkedin.com"]').map((_, element) => $(element).attr('href')).get());
    result.facebook.push(...$('a[href*="facebook.com"]').map((_, element) => $(element).attr('href')).get());
    result.twitter.push(...$('a[href*="twitter.com"]').map((_, element) => $(element).attr('href')).get());
    result.instagram.push(...$('a[href*="instagram.com"]').map((_, element) => $(element).attr('href')).get());

    if (depth < maxDepth) {
      const nextPageUrls = $('a').map((_, element) => $(element).attr('href')).get();
      const absoluteNextPageUrls = nextPageUrls.map((nextUrl) => new URL(nextUrl, baseUrl).href);

      for (const nextPageUrl of absoluteNextPageUrls) {
        await crawl(nextPageUrl, depth + 1);
      }
    }
  } catch (error) {
    return;
  }
};

function removeDuplicates(arr) {
  return [...new Set(arr)]
}

const crawlAndReturnResult = async (baseUrl, maxDepth) => {
  await crawl(baseUrl, 0, maxDepth, baseUrl);
  return cleanResult(result);
};

function cleanResult(result) {
  result.emails = removeDuplicates(result.emails);
  result.phones = removeDuplicates(result.phones);
  result.facebook = removeDuplicates(result.facebook);
  result.linkedin = removeDuplicates(result.linkedin);
  result.twitter = removeDuplicates(result.twitter);
  result.instagram = removeDuplicates(result.instagram);

  return result
}

async function resFunc() {
  const baseUrl = 'https://www.wordstream.com/'; // Replace with your target URL
  const max = 1; // Set the maximum depth for crawling
  const crawledResult = await crawlAndReturnResult(baseUrl, max);
  const newResult = crawledResult
  console.log(newResult.linkedin.length);
  console.log(newResult.instagram.length);
  console.log(newResult.facebook.length);
  console.log(newResult.twitter.length);
}

resFunc()
