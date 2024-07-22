import express, { Request, Response } from 'express';
import pool from '../db';
import { Post } from '../models/post';

const router = express.Router();

// GET all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post
router.post('/', async (req: Request, res: Response) => {
  const { title, writer, content } = req.body as Post;
  try {
    const { rows } = await pool.query(
      'INSERT INTO posts (title, writer, content) VALUES ($1, $2, $3) RETURNING *',
      [title, writer, content]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// EDIT a post
router.put('/:id', async (req: Request, res: Response) => {
  const id: number  = parseInt(req.params.id, 10);
  const { title, writer, content } = req.body as Post;
  try {
    const { rows } = await pool.query(
      'UPDATE posts SET title = $1, writer = $2, content = $3 WHERE id = $4 RETURNING *',
      [title, writer, content, id]
    );
    res.json(rows[0]);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;