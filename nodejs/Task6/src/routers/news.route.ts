import { Router } from "express";
import newsService from "../services/news.service.ts";
import { User } from "../entities/User.entity.ts";

const newsRouter = Router();

/**
 * @openapi
 * '/newsposts':
 *   get:
 *     summary: Retrieve a list of news posts
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Newsposts
 *     description: Retrieves a list of news posts. Supports pagination with `size` and `page` query parameters.
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of items per page (optional).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (optional).
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of news posts.
 *       404:
 *         description: Not Found. Returned when no news posts are found.
 *       500:
 *         description: Internal Server Error. Returned in case of server issues.
 */

newsRouter.get("/", async (req, res) => {
  try {
    const news = await newsService.getNews();

    const { size, page } = req.query;
    if (size && page) {
      const startIndex = (+page - 1) * +size;
      const endIndex = +size * +page;
      const paginatedNews = news.slice(startIndex, endIndex);

      if (paginatedNews.length > 0) {
        res.status(200).json(paginatedNews);
      } else {
        res.status(404).json([]);
      }
    } else {
      res.status(200).json(news);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// GET a single news item by ID
/**
 * @openapi
 * /newsposts/{id}:
 *   get:
 *     summary: Retrieve a list of news posts with current id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Newsposts
 *     description: Retrieves a list of news posts. Supports `id` params.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Retrieve current id news.
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of news posts.
 *       404:
 *         description: Not Found. Returned when no news posts are found.
 *       500:
 *         description: Internal Server Error. Returned in case of server issues.
 */
newsRouter.get("/:id", async (req, res) => {
  try {
    const news = await newsService.getNewsById(req.params.id);

    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

/**
 * @openapi
 * /newsposts:
 *  post:
 *     tags:
 *     - Newsposts
 *     summary: Send new newspost
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateNewsInput'
 *     responses:
 *      201:
 *        description: Success
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
newsRouter.post("/", async (req, res) => {
  try {
    const { authorId } = req.body;
    const author = await User.findOneBy({
      id: authorId,
    });
    console.log(author);
    const news = await newsService.createNewNews({ ...req.body, author });

    if (news) {
      res.status(201).json("News has been created successfully");
    } else {
      res.status(404).json("News Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// PUT (update) a news item by ID
/**
 * @openapi
 * /newsposts/{id}:
 *   put:
 *     summary: Edit news post with current id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Newsposts
 *     description: Edit news post. Supports `id` params.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Edit current id news.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateNewsInput'
 *     responses:
 *       201:
 *         description: Successful response.
 *       404:
 *         description: Not Found. Returned when no news posts are found.
 *       500:
 *         description: Internal Server Error. Returned in case of server issues.
 */
newsRouter.put("/:id", async (req, res) => {
  const updatedNews = await newsService.updateNews(req.params.id, req.body);

  if (updatedNews) {
    res.status(201).json("News has been updated successfully");
  } else {
    res.status(404).json("News Not Found");
  }
});

// DELETE a news item by ID
/**
 * @openapi
 * /newsposts/{id}:
 *   delete:
 *     summary: Delete news post with current id
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Newsposts
 *     description: Delete news post. Supports `id` params.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Delete current id news.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateNewsInput'
 *     responses:
 *       201:
 *         description: Successful response.
 *       404:
 *         description: Not Found. Returned when no news posts are found.
 *       500:
 *         description: Internal Server Error. Returned in case of server issues.
 */
newsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await newsService.deleteNews(req.params.id);

    if (result.affected === 1) {
      res.status(201).json("News has been deleted successfully");
    } else {
      res.status(404).json("News Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

export default newsRouter;
