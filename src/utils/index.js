export function showTip(content, type='success') {
  this.show = true
  this.alertType = type
  this.alertText = content
  setTimeout(() => {
    this.show = false
  }, 1000)
}

export function close() {
  setTimeout(() => {
    this.$router.go(-1)
  }, 1000)
}