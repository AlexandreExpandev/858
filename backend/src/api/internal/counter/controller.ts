import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/response/responseUtils';
import { CounterService } from '../../../services/counter/counterService';

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
    
    const counterService = new CounterService(userId);
    
    try {
      const status = await counterService.start();
      
      // Return success response with updated button states
      res.json(successResponse({
        message: 'Counter started',
        status: 'running',
        currentValue: 1,
        controlStates: {
          startButton: 'disabled',
          pauseButton: 'enabled',
          resetButton: 'enabled'
        },
        notification: 'Contagem iniciada!'
      }));
    } catch (error: any) {
      if (error.message === 'counterNotIdle') {
        res.status(400).json(errorResponse('Counter is already running or paused'));
        return;
      }
      throw error;
    }
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
    
    const counterService = new CounterService(userId);
    const status = await counterService.pause();
    
    if (!status) {
      res.status(400).json(errorResponse('Counter is not running'));
      return;
    }
    
    res.json(successResponse({
      message: 'Counter paused',
      status: 'paused',
      currentValue: status.currentValue
    }));
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
    
    const counterService = new CounterService(userId);
    const status = await counterService.resume();
    
    if (!status) {
      res.status(400).json(errorResponse('Counter is not paused'));
      return;
    }
    
    res.json(successResponse({
      message: 'Counter resumed',
      status: 'running',
      currentValue: status.currentValue
    }));
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
    
    const counterService = new CounterService(userId);
    await counterService.restart();
    
    res.json(successResponse({
      message: 'Counter restarted',
      status: 'running',
      currentValue: 1
    }));
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

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid speed value. Must be slow, medium, or fast'));
      return;
    }
    
    const counterService = new CounterService(userId);
    await counterService.setSpeed(result.data.speed);
    
    res.json(successResponse({
      message: `Counter speed set to ${result.data.speed}`,
      speed: result.data.speed
    }));
  } catch (error) {
    next(error);
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
    
    const counterService = new CounterService(userId);
    const status = await counterService.getStatus();
    
    res.json(successResponse(status));
  } catch (error) {
    next(error);
  }
}
