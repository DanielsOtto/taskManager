export class Unauthorized extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super('Unauthorized access');
    }
    this.type = 'UNAUTHORIZED';
  }
}