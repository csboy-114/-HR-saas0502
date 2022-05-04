export const imageerror = {
  inserted(dom, options) {
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}

