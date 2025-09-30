/**
 * @summary
 * Utility functions for logging
 */

/**
 * Creates a logger instance for a specific module
 * 
 * @param module The module name to include in log messages
 * @returns A logger object with various logging methods
 */
export function createLogger(module: string) {
  const timestamp = () => new Date().toISOString();
  
  return {
    info: (message: string, data?: any) => {
      console.log(`[${timestamp()}] [INFO] [${module}] ${message}`, data ? JSON.stringify(data) : '');
    },
    
    warn: (message: string, data?: any) => {
      console.warn(`[${timestamp()}] [WARN] [${module}] ${message}`, data ? JSON.stringify(data) : '');
    },
    
    error: (message: string, error?: any) => {
      console.error(
        `[${timestamp()}] [ERROR] [${module}] ${message}`,
        error ? (error.stack || JSON.stringify(error)) : ''
      );
    },
    
    debug: (message: string, data?: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[${timestamp()}] [DEBUG] [${module}] ${message}`, data ? JSON.stringify(data) : '');
      }
    }
  };
}
