function toggle(e, selector){
  e.preventDefault();
  console.log(this)
  console.log(e)
  console.log(selector)
  $(selector).toggle();
}