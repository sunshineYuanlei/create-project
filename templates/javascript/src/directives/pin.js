const pin = {
  mounted(el, binding) {
    let { value: pinned, modifiers: position, arg: args } = binding
    console.log("```position", position)
    if (pinned) {
      el.style.position = "fixed"
      if (args === "warning") {
        el.style.backgroundColor = "pink"
      }
      Object.keys(position).forEach((key) => (el.style[key] = "20px"))
    } else {
      el.style.position = "static"
      el.style.backgroundColor = ""
    }
  },
}
export default pin
