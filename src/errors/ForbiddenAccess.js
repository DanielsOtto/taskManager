export class ForbiddenAccess extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super('Forbidden access!');
    }
    this.type = 'FORBIDDEN_ACCESS';
  }
}