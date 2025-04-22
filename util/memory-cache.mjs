export default class MemoryCache {
  constructor() {
    this.cache = {}
    this.size = 0
  }

  add(key, value, time, timeoutCallback) {
    var old = this.cache[key]
    var instance = this

    var entry = {
      value: value,
      expire: time + Date.now(),
      timeout: setTimeout(function () {
        instance.delete(key)
        return (
          timeoutCallback &&
          typeof timeoutCallback === 'function' &&
          timeoutCallback(value, key)
        )
      }, time),
    }

    this.cache[key] = entry
    this.size = Object.keys(this.cache).length

    return entry
  }

  delete(key) {
    var entry = this.cache[key]

    if (entry) {
      clearTimeout(entry.timeout)
    }

    delete this.cache[key]

    this.size = Object.keys(this.cache).length

    return null
  }

  get(key) {
    var entry = this.cache[key]

    return entry
  }

  getValue(key) {
    var entry = this.get(key)

    return entry && entry.value
  }

  clear() {
    Object.keys(this.cache).forEach(function (key) {
      this.delete(key)
    }, this)

    return true
  }
}
