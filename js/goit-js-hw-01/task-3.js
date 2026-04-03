function getElementWidth(content, padding, border) {
  const contentValue = parseFloat(content);
  const paddingValue = parseFloat(padding);
  const borderValue = parseFloat(border);
  return contentValue + paddingValue * 2 + borderValue * 2;
}

console.log(getElementWidth("50px", "8px", "4px"));
console.log(getElementWidth("60px", "12px", "8.5px"));
console.log(getElementWidth("200px", "0px", "0px"));
