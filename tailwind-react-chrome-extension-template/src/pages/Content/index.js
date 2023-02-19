import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const text = request.text;
  const params = request.params;
  const highlightedElement = document.getSelection();
  // we will insert it before the paragraph
  const insert_node = highlightedElement.anchorNode.parentElement;

  // now, inject a box into the DOM just above the highlighted text
  // don't use absolute positioning because it will be relative to the
  // highlighted text, which will change as the user scrolls
  const box = document.createElement('p');
  box.style.border = '1px solid black';
  box.style.padding = '10px';
  box.style.marginTop = '0.75rem';
  box.style.marginBottom = '0.75rem';
  //   box.style.width = '100%';
  box.style.height = '100%';
  box.innerText = 'This is a box';

  insert_node.insertBefore(box, highlightedElement.anchorNode);
});
