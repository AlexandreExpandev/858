import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';
import { 
  startCounter, 
  pauseCounter, 
  resumeCounter, 
  restartCounter,
  setCounterSpeed,
  getCounterStatus
} from '../../../services/counter/counterService';
import { logger } from '../../../utils/logger';

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

    // Apply rate limiting (in a real app, this would be more sophisticated)
    // For now, we'll just log the request\n    logger.info('Start counter request received', { userId, timestamp: new Date().toISOString() });\n\n    const result = await startCounter(userId);\n    res.json(successResponse(result));\n  } catch (error) {\n    if (error instanceof Error) {\n      if (error.message === 'CounterAlreadyRunning') {\n        res.status(400).json(errorResponse('Counter is already running'));\n        return;\n      } else if (error.message === 'CounterNotIdle') {\n        res.status(400).json(errorResponse('Counter is not in idle state'));\n        return;\n      }\n    }\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Pauses the counter at the current number\n */\nexport async function pauseHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    const userId = req.user?.id;\n    if (!userId) {\n      res.status(401).json(errorResponse('Unauthorized'));\n      return;\n    }\n\n    const result = await pauseCounter(userId);\n    res.json(successResponse(result));\n  } catch (error) {\n    if (error instanceof Error && error.message === 'CounterNotRunning') {\n      res.status(400).json(errorResponse('Counter is not running'));\n      return;\n    }\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Resumes the counter from the paused position\n */\nexport async function resumeHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    const userId = req.user?.id;\n    if (!userId) {\n      res.status(401).json(errorResponse('Unauthorized'));\n      return;\n    }\n\n    const result = await resumeCounter(userId);\n    res.json(successResponse(result));\n  } catch (error) {\n    if (error instanceof Error && error.message === 'CounterNotPaused') {\n      res.status(400).json(errorResponse('Counter is not paused'));\n      return;\n    }\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Restarts the counter back to 1\n */\nexport async function restartHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    const userId = req.user?.id;\n    if (!userId) {\n      res.status(401).json(errorResponse('Unauthorized'));\n      return;\n    }\n\n    const result = await restartCounter(userId);\n    res.json(successResponse(result));\n  } catch (error) {\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Sets the speed of the counter (slow, medium, fast)\n */\nexport async function setSpeedHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    const userId = req.user?.id;\n    if (!userId) {\n      res.status(401).json(errorResponse('Unauthorized'));\n      return;\n    }\n\n    // Validate request body\n    const schema = z.object({\n      speed: z.enum(['slow', 'medium', 'fast'])\n    });\n\n    const result = schema.safeParse(req.body);\n    if (!result.success) {\n      res.status(400).json(errorResponse('Invalid speed value. Must be slow, medium, or fast'));\n      return;\n    }\n\n    const { speed } = result.data;\n    const updatedCounter = await setCounterSpeed(userId, speed);\n    res.json(successResponse(updatedCounter));\n  } catch (error) {\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Gets the current status of the counter\n */\nexport async function getStatusHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    const userId = req.user?.id;\n    if (!userId) {\n      res.status(401).json(errorResponse('Unauthorized'));\n      return;\n    }\n\n    const status = await getCounterStatus(userId);\n    res.json(successResponse(status));\n  } catch (error) {\n    next(error);\n  }\n}