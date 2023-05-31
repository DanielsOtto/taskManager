export class EmptyCollection extends Error {
  constructor() {
    super(`The collection is empty!`);
    this.type = 'EMPTY_COLLECTION';
  }
}