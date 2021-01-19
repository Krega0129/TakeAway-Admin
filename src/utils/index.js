let _this = null

export async function showTip(content, type='success') {
  this.show = true
  _this = this
  this.alertType = type
  this.alertText = content
  close()
}

export function close() {
  setTimeout(() => {
    _this.show = false
    _this.$router.go(-1)
  }, 1000)
}