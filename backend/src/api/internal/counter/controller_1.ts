import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { 
  startCounter, 
  pauseCounter, 
  resumeCounter, 
  restartCounter, 
  setCounterSpeed,
  getCounterStatus
} from '../../../services/counter/counterService';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';

/**
 * @summary
 * Starts the counter sequence from 1 to 10
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const result = await startCounter(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Pauses the counter at the current number
 */
export async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const result = await pauseCounter(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Resumes the counter from the paused position
 */
export async function resumeHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const result = await resumeCounter(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Restarts the counter back to 1
 */
export async function restartHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const result = await restartCounter(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Sets the speed of the counter (slow, medium, fast)
 */
export async function setSpeedHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    // Validate request body
    const schema = z.object({
      speed: z.enum(['slow', 'medium', 'fast'])
    });

    const validatedData = schema.parse(req.body);
    
    const result = await setCounterSpeed(userId, validatedData.speed);
    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Invalid speed value. Must be slow, medium, or fast', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Gets the current status of the counter
 */
export async function getStatusHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const result = await getCounterStatus(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}
