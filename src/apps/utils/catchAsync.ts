import { Request, Response, NextFunction } from 'express';

const catchAsync = <
  ReqType extends Request = Request,
  ResType extends Response = Response
>(
  fn: (req: ReqType, res: ResType, next: NextFunction) => Promise<void>,
) => {
  return (req: ReqType, res: ResType, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
