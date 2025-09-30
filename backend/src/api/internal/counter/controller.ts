import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';
import { CounterService } from '../../../services/counter/counterService';

// Create a singleton counter service instance
const counterService = new CounterService();

/**
 * @summary
 * Starts the counting sequence from 1 to 10
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id || 'anonymous';
    const result = counterService.startCounting(userId);
    
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

/**
 * @summary
 * Pauses the counting sequence at the current number
 */
export async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id || 'anonymous';
    const result = counterService.pauseCounting(userId);
    
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

/**
 * @summary
 * Resumes the counting sequence from the paused number
 */
export async function resumeHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id || 'anonymous';
    const result = counterService.resumeCounting(userId);
    
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

/**
 * @summary
 * Restarts the counting sequence from 1
 */
export async function restartHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id || 'anonymous';
    const result = counterService.restartCounting(userId);
    
    res.json(successResponse(result));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

/**
 * @summary
 * Sets the counting speed (slow, medium, fast)
 */
export async function setSpeedHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const schema = z.object({
      speed: z.enum(['slow', 'medium', 'fast'])
    });

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid speed value. Must be slow, medium, or fast'));
      return;
    }

    const userId = req.user?.id || 'anonymous';
    const updatedStatus = counterService.setCountingSpeed(userId, result.data.speed);
    
    res.json(successResponse(updatedStatus));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}

/**
 * @summary
 * Gets the current status of the counter
 */
export async function getStatusHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id || 'anonymous';
    const status = counterService.getCounterStatus(userId);
    
    res.json(successResponse(status));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
}
