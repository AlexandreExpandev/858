import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { 
  startCounting, 
  pauseCounting, 
  resumeCounting, 
  restartCounting, 
  updateCountingSpeed,
  getCounterStatus
} from '../../../services/counter/counterService';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';

/**
 * @summary
 * Starts the counting sequence from 1 to 10
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    const result = await startCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Pauses the counting sequence at the current number
 */
export async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    const result = await pauseCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Resumes the counting sequence from the paused number
 */
export async function resumeHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    const result = await resumeCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Restarts the counting sequence from 1
 */
export async function restartHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    const result = await restartCounting(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Updates the counting speed (slow, medium, fast)
 */
export async function updateSpeedHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    // Validate request body
    const speedSchema = z.object({
      speed: z.enum(['slow', 'medium', 'fast'])
    });

    const validatedData = speedSchema.parse(req.body);
    
    const result = await updateCountingSpeed(userId, validatedData.speed);
    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Invalid speed value', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Gets the current counter status including current number and state
 */
export async function getStatusHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json(errorResponse('User not authenticated'));
    }
    
    const result = await getCounterStatus(userId);
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
}
