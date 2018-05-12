function stringToHtml(str) {

  let parser = new DOMParser(),
      dom = parser.parseFromString(str.replace(/>\s+</g,'><'), "text/html");
  return dom.body.firstChild;
}

export default {
  stringToHtml
};