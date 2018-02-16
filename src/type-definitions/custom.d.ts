
//Update Express Request interface to accept mutations required
declare namespace Express {
    export interface Request {
       log?: any;
       config?: any;
       correlationId?: any;
       user?: any;
       [key: string]: any;
    }
 }