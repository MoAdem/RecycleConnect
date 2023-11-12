
import express from 'express';
const router = express.Router();
import newsController from '../controller/News.js';


//merg
// routes
router.get('/scrape-news', async (req, res) => {
    try {
      await newsController.scrapeAndSaveNews(req, res);
    } catch (error) {
      console.error('Error in /scrape-news route:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
    router.get('/news',newsController.all_news)

export default router;
