// Import necessary libraries
import axios from 'axios';
import cheerio from 'cheerio';
import News from '../model/News.js';
import cron from 'node-cron';

const newsController = {

scrapeNewsData : async (url, source, selectors) => {
    try {
      const response = await axios.get(url);
  
      const $ = cheerio.load(response.data);
  
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
            //console.warn(`Skipping news article with missing or empty title for source ${source}`);
            return null;
          }
        }).get().filter(Boolean);
  
      return newsData;
    } catch (error) {
      console.error(`Error scraping news data from ${source}:`, error.message);
      throw error;
    }
  },
  
  scrapeAndSaveNews: async (req, res) => {
    try {
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
                newsPhoto: 'div.responsiveimage.parbase.section img',
                description: 'div.textarea.parbase.section p',
            },
          },

      ];
  

      const scrapedNews = await Promise.all(websites.map(site => newsController.scrapeNewsData(site.url, site.source, site.selectors)));

    const allNews = [].concat(...scrapedNews);

    try {
      await News.insertMany(allNews, { ordered: false });
    } catch (error) {
      if (error.code === 11000) {
        console.warn(`Duplicate key error: ${error.message}`);
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
        return;
      }
    }

  } catch (error) {
    console.error(error);
  }
},

scheduleNewsScraping: async (req, res) => {
  try {
    cron.schedule('*/1 * * * *', () => {
      newsController.scrapeAndSaveNews(req, res);
    });

    res.status(200).json({ message: 'News scraping scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
},

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
  
