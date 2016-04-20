function greeting() {
  return "hello";
}

function complementor() {
  return "hello you sexy JavaScript beast"
}

//not module.exports anymore

export {
  default: greeting
  complementor: complementor
}
