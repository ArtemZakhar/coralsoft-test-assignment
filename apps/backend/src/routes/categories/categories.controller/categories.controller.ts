import { getCategories } from '../../../services/mealDbService';
import { Request, Response } from 'express';
import { responseCodesAndMsg } from '../../../constants/response';

/**
 * @swagger
 * tags: Categories
 * description: API for handling categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export const httpGetAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    return res.status(responseCodesAndMsg.codes[200]).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.getCategories });
  }
};
