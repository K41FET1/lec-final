const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const isAuth = require("../middleware/isAuth");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: List of blogs
 */
router.get("/", getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog data
 *       404:
 *         description: Blog not found
 */
router.get("/:id", getBlog);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     tags: [Blogs]
 *     summary: Create a new blog post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post("/", isAuth, upload.single("coverImage"), createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     tags: [Blogs]
 *     summary: Update a blog post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put("/:id", isAuth, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete a blog post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", isAuth, deleteBlog);

module.exports = router;
