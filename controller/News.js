// Import necessary libraries
import axios from 'axios';
import cheerio from 'cheerio';
import News from '../model/News.js';

const newsController = {
scrapeNewsData : async (url, source, selectors) => {
    try {
      // Make an HTTP request to the target website
      const response = await axios.get(url);
  
      // Load the HTML content into Cheerio
      const $ = cheerio.load(response.data);
  
      // Extract relevant information using custom selectors
      const newsData = $(selectors.articleSelector).slice(0, 3) .map((index, element) => {
        const title = $(element).find(selectors.title).text();
        const newsPhoto = $(element).find(selectors.newsPhoto).attr('src');
        const description = $(element).find(selectors.description).text();
  
        if (title && title.trim() !== '') {
            return {
              title,
              newsPhoto,
              description,
              source,
            };
          } else {
            console.warn(`Skipping news article with missing or empty title for source ${source}`);
            return null;
          }
        }).get().filter(Boolean);
  
      return newsData;
    } catch (error) {
      console.error(`Error scraping news data from ${source}:`, error.message);
      throw error;
    }
  },
  
  // Controller function to handle news scraping and saving
  scrapeAndSaveNews : async (req, res) => {
    try {
      // Define the websites to scrape with custom selectors
      const websites = [
        {
            url: 'https://www.oxfam.org/en',                           
            source: 'Oxfam',
            selectors: {
              articleSelector: 'article.node-teaser-grid',
              title: 'h3.mb-0.text-lg.text-green-accessible.pb-2.font-body.leading-tight',
              newsPhoto: 'header.thumbnail img',
              description: 'div.text-grey.hidden.md\\:block.leading-normal',
            },
          },
        {
            url: 'https://www.savethechildren.org/',
            source: 'Save the Children',
            selectors: {
                articleSelector: 'section.section--biscuit-light',
                title: 'div.column div.textarea.parbase.section h3.teaser__heading--hp a',
                newsPhoto: 'div.column div.responsiveimage.parbase.section a div picture img',
                description: 'div.textarea.parbase.section p',
            },
          },


        // Add more websites as needed
      ];
  
      // Use Promise.all to execute scraping functions concurrently
      const scrapedNews = await Promise.all(websites.map(site => newsController.scrapeNewsData(site.url, site.source, site.selectors)));
  
      // Flatten the array of arrays into a single array
      const allNews = [].concat(...scrapedNews);
  
      // Save scraped news to the database
      await News.insertMany(allNews);
  
      res.status(200).json({ message: 'News scraping successful', news: allNews });
    } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error (E11000), handle it gracefully
          console.warn(`Duplicate key error: ${error.message}`);
          res.status(200).json({ message: 'No recent news available' });
        } else {
          // Other errors
          console.error(error);
          res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      }
  },
    // Retrieve all news
    all_news : async (req, res) => {
      try {
        const news = await News.find();
        res.status(200).json({ success: true, news });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
}
    export default newsController;
  
