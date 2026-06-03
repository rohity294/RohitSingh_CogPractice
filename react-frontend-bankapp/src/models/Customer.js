// Simple Customer model/normalizer for frontend use
export default class Customer {
  constructor({ id = '', name = '' } = {}) {
    this.id = id
    this.name = name
  }

  static from(obj) {
    return new Customer({ id: obj.id || obj._id || '', name: obj.name || '' })
  }
}
