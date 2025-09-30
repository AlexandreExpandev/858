import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';
import { 
  startCounting,
  pauseCounting,
  resumeCounting,
  restartCounting,
  setCountingSpeed,
  getCounterStatus
} from '../../../services/counter/counterService';

/**
 * @summary
 * Starts the counting process from 1 to 10
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }
    
    const result = await startCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Pauses the ongoing counting process
 */
export async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }
    
    const result = await pauseCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Resumes the counting process from where it was paused
 */
export async function resumeHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }
    
    const result = await resumeCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Restarts the counting process from 1
 */
export async function restartHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }
    
    const result = await restartCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Sets the speed of the counting process
 */
export async function speedHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    const validationResult = schema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json(errorResponse('Invalid speed value. Must be slow, medium, or fast'));
      return;
    }
    
    const { speed } = validationResult.data;
    const result = await setCountingSpeed(userId, speed);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Gets the current status of the counter
 */
export async function statusHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
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
