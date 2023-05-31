export function errorMiddleware(err, req, res, next) {
  next(err);
}