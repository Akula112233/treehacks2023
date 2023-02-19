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

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  const text = request.text;
  const highlightedElement = document.getSelection();
  // we will insert it before the paragraph
  const insert_node = highlightedElement.anchorNode.parentElement;

  // now, inject a box into the DOM just above the highlighted text
  // don't use absolute positioning because it will be relative to the
  // highlighted text, which will change as the user scrolls
  const box = document.createElement('p');
  box.style.border = '1px solid red';
  box.style.padding = '10px';
  box.style.marginTop = '0.75rem';
  box.style.marginBottom = '0.75rem';
  //   box.style.width = '100%';
  box.style.height = '100%';

  console.log('PARAMS');

  const { name, ...params } = request.params;
  console.log('enw params', params);

  box.innerText = 'Resulting simplification of the text...';
  //   console.log(to_display);
  const to_modify = insert_node.insertBefore(
    box,
    highlightedElement.anchorNode
  );

  const ret = await fetch('https://treehacks2023.uc.r.appspot.com/send_text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...params,
      raw_website: document.documentElement.innerHTML,
    }),
  }).then((res) => res.json());

  to_modify.innerText = ret.response;

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

// window.addEventListener('beforeunload', () => {
//   setCookies();
// });
