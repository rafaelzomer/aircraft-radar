function stringToHtml(str) {
  let parser = new DOMParser(),
      dom = parser.parseFromString(str.replace(/>\s+</g,'><'), "text/html");
  return dom.body.firstChild;
}

function generateHash(){
  return Math.random().toString(36).substring(7);
}

export default {
  stringToHtml,
  generateHash
};