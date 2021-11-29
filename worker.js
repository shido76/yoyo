self.addEventListener('message', function (e) {
  //console.log('web worker called', duration)


  this.self.postMessage(execute())
})