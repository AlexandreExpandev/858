import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';
import { CounterService } from '../../../services/counter/counterService';

// Singleton instance of the counter service
const counterService = CounterService.getInstance();

/**
 * @summary
 * Starts the counter sequence from 1 to 10
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
 * Pauses the ongoing counter sequence
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
 * Resumes the counter sequence from where it was paused
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
 * Restarts the counter sequence from 1
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
 * Sets the speed of the counter sequence
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
