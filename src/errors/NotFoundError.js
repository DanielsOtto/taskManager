export class NotFoundError extends Error {
  constructor(object) {
    super(`ERROR, ${object} is not found!`);
    this.type = 'NOT_FOUND';
  }
}