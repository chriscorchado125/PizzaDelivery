/**
 * Pizza delivery which does not delivery to the same house more than once
 * @module PizzaDelivery
 */
 class PizzaDelivery {
    deliveryLoc = [] // keep track of locations which have already been delivered to
    deliveredBy = [{ 'x': 0, 'y': 0 }] // original delivery resource

  /**
  * @param {string} deliveries String of up,down,right,left moves represented by ^v><
  * @param {number} helpers Number of helpers
  */
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

  /**
  * Update delivery location for a resource
  * @param {string} direction up,down,right,left
  * @param {object} deliveryResource {x: int, y: int}
  * @returns {object} updated deliveryResource {x: int, y: int}
  */
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

      // iterate over the delivery resources so they take turns delivering or keep cycling one resource
      currDelivery = this.updateDeliveryResource(this.deliveries[i], deliveryWorker.next().value)

      // check if the current delivery location exists in the delivery log
      const delivered = this.deliveryLoc.some(
        location => location['x'] === currDelivery.x && location['y'] === currDelivery.y
      )

      // if the location has not been delivered to, we add it to the delivery log
      if (!delivered) this.deliveryLoc.push({ 'x': currDelivery.x, 'y': currDelivery.y })
    }
  }

  getDeliveryCount() {
    return this.deliveryLoc.length
  }

  // cycle delivery sources
  *yieldArray(arr) {
    while (true) {
      yield* arr
    }
  }
}

export default PizzaDelivery;
