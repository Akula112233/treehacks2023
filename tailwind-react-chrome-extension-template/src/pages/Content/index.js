import { printLine } from './modules/print';

// const getCookieValue = (name) =>
//   document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

// window.onload = () => {
//   let transformations = getCookieValue('transformations');
//   if (transformations) {
//     transformations = JSON.parse(transformations);
//   } else {
//     transformations = [];
//   }

//   let to_display = getCookieValue('to_display');
//   if (to_display) {
//     to_display = JSON.parse(to_display);
//   } else {
//     to_display = [];
//   }

//   for(let i = 0; i < transformations.length; i++) {
// 	if(to_display[i]) {
// 		const highlightedElement = transformations[i].highlightedElement;
// 		const box = transformations[i].box;
// 		const insert_node = highlightedElement.anchorNode.parentElement;
// 		insert_node.insertBefore(box, highlightedElement.anchorNode);
// 	}
//   }
// };

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
  box.innerText = 'Resulting simplification of the text...';

//   let transformations = getCookieValue('transformations');
//   if (transformations) {
//     transformations = JSON.parse(transformations);
//   } else {
//     transformations = [];
//   }

//   let to_display = getCookieValue('to_display');
//   if (to_display) {
//     to_display = JSON.parse(to_display);
//   } else {
//     to_display = [];
//   }

  //   console.log('wtf');
  //   console.log(transformations);
  //   console.log(to_display);
  insert_node.insertBefore(box, highlightedElement.anchorNode);
//   transformations.push({ highlightedElement, box });
//   to_display.push(true);
//   setCookies(transformations, to_display);
});

const setCookies = (transformations, to_display) => {
//   console.log(`set: ${JSON.stringify(transformations)} ${to_display}`);
//   if (transformations)
//     document.cookie = `transformations=${JSON.stringify(transformations)}`;
//   if (to_display) document.cookie = `to_display=${JSON.stringify(to_display)}`;
};

window.addEventListener('beforeunload', () => {
  setCookies();
});
