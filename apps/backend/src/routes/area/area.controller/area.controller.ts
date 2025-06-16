import { responseCodesAndMsg } from '../../../constants/response';
import { getAreas } from '../../../services/mealDbService';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags: Areas
 * description: API for handling areas
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Get all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: List of areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await getAreas();
    return res.status(responseCodesAndMsg.codes[200]).json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    return res
      .status(responseCodesAndMsg.codes[500])
      .json({ error: responseCodesAndMsg.messages.error.getAreas });
  }
};
