
import express from 'express';
const router = express.Router();
import newsController from '../controller/News.js';


//merg
// routes

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API for managing news
 */

/**
 * @swagger
 * /api/news/scrape-news:
 *   get:
 *     summary: Scrape and save news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: News scraped successfully
 */
router.get('/scrape-news', async (req, res) => {
    try {
      await newsController.scrapeAndSaveNews(req, res);
    } catch (error) {
      console.error('Error in /scrape-news route:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
    router.get('/',newsController.all_news)
    router.get('/schedule-news-scraping',newsController.scheduleNewsScraping)

export default router;
