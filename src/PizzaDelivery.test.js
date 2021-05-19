// import PizzaDelivery from './PizzaDelivery'

class PizzaDelivery {
  deliveryLoc = [] // keep track of deliveries
  deliveredBy = [{ 'x': 0, 'y': 0 }] // original delivery resources

  constructor(deliveries, helpers = 0) {
    this.deliveries = deliveries
    this.helpers = helpers
    this.createDeliveryResources()
    this.makeDeliveries()
  }

  // create additional resources to deliver
  createDeliveryResources() {
    if (this.helpers) {
      for (let i = 0; i < this.helpers; i++){
        this.deliveredBy.push({ 'x': 0, 'y': 0 })
      }
    }
  }

 // update delivery location for a resources
  updateDeliveryResource(direction, deliveryResource) {
    switch (direction) {
      case '^':
        deliveryResource.y++
        break;
      case '>':
        deliveryResource.x++
        break;
      case 'v':
        deliveryResource.y--
        break;
      case '<':
        deliveryResource.x--
        break;
    }
    return deliveryResource
  }

  // populate delivery locations
  makeDeliveries() {
    this.deliveryLoc.push({ 'x': 0, 'y': 0 }) // starting delivery
    const deliveryWorker = this.yieldArray(this.deliveredBy) // create an iterable from delivery resources
    let currDelivery = {}

    for (let i = 0; i < this.deliveries.length; i++) {

      currDelivery = this.updateDeliveryResource(this.deliveries[i], deliveryWorker.next().value)

      const delivered = this.deliveryLoc.some(
        location => location['x'] === currDelivery.x && location['y'] === currDelivery.y
      )
      if (!delivered) this.deliveryLoc.push({ 'x': currDelivery.x, 'y': currDelivery.y })
    }
  }

  getDeliveryCount() {
    return this.deliveryLoc.length
  }

  // cycle deliveries
  *yieldArray(arr) {
    while (true) {
      yield* arr
    }
  }
}

describe('Part 1', function () {
  test('a: > = 2 | delivers pizzas to two houses: one to the house at the starting location, and one to the house directly east of the starting location', () => {
    const pizza = new PizzaDelivery('>')
    expect(pizza.getDeliveryCount()).toBe(2)
  })

  test('b: ^>v< = 4 | delivers pizzas to four houses in a square; the house at the starting/ending location ends up with two pizzas.', () => {
    const pizza = new PizzaDelivery('^>v<')
    expect(pizza.getDeliveryCount()).toBe(4)
  })

  test('c: ^v^v^v^v^v = 2 | delivers a bunch of pizzas to some very lucky people at only two houses.', () => {
    const pizza = new PizzaDelivery('^v^v^v^v^v')
    expect(pizza.getDeliveryCount()).toBe(2)
  })
})

describe('Part 2', function () {
  test('a: ^v = 3 | now delivers pizzas to three houses; The delivery person goes north and the goat goes south.', () => {
    const pizza = new PizzaDelivery('^v', 1)
    expect(pizza.getDeliveryCount()).toBe(3)
  })

  test('b: ^>v< = 3 | now delivers pizzas to three houses; The delivery person and the goat both end up back where they started.', () => {
    const pizza = new PizzaDelivery('^>v<', 1)
    expect(pizza.getDeliveryCount()).toBe(3)
  })

  test('c: ^v^v^v^v^v = 11 | now delivers pizzas to 11 houses; The delivery person treks north and the goat treks south.', () => {
    const pizza = new PizzaDelivery('^v^v^v^v^v', 1)
    expect(pizza.getDeliveryCount()).toBe(11)
  })
})
