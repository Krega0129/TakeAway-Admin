export async function showTip(content, type='success') {
  this.show = true
  this.alertType = type
  this.alertText = content
}

export function close() {
  setTimeout(() => {
    this.show = false
    this.$router.go(-1)
  }, 1000)
}