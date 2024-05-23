// I was lazy and made ChatGPT do this; do I need to give credit?

export class EventEmitter {
  constructor() {
    this.events = {}
  }

  // Register an event listener for a specific event
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
    return this
  }

  // Register a one-time event listener for a specific event
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args)
      this.off(event, onceWrapper)
    }
    this.on(event, onceWrapper)
    return this
  }

  // Emit an event, triggering all associated listeners
  emit(event, ...args) {
    if (!this.events[event]) {
      return false
    }
    this.events[event].forEach(listener => {
      listener.apply(this, args)
    })
    return true
  }

  // Remove a specific listener for a specific event
  off(event, listener) {
    if (!this.events[event]) {
      return this
    }
    this.events[event] = this.events[event].filter(l => l !== listener)
    return this
  }
}
