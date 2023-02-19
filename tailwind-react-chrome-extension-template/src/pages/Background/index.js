import { get_dom_element } from '../Content';
import { contextMenuInit } from '../ContextMenu/ContextMenu';

console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('test');

chrome.runtime.onInstalled.addListener(async () => {
  contextMenuInit();
});

/**
 * When the website is loaded, retrieve the cookies and send them
 */
// chrome.tabs.onUpdated.addListener(async (tabId, info) => {
//   console.log("updated");
//   console.log(info.status);
//   if (info.status === 'complete') {
//     const transformations = await chrome.cookies.get({
//       url: tab.url,
//       name: 'transformations',
//     });
//     const to_display = await chrome.cookies.get({
//       url: tab.url,
//       name: 'to_display',
//     });
//     console.log('Loading from cookies...');
//     console.log(transformations);
//     console.log(to_display);
//     chrome.tabs.sendMessage(tabId, {
//       type: 'load',
//       transformations,
//       to_display,
//     });
//   }
// });

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case 'summarizeText':
      processText(info.selectionText, {
        name: 'summarizeText',
        highlighted: true,
        type: 'summarize',
      });
      break;
    case 'simplifyText':
      processText(info.selectionText, {
        name: 'selectionText',
        highlighted: true,
        type: 'simplify',
      });
      break;
    case 'summarizeArticle':
      processText('', {
        name: 'summarizeArticle',
        highlighted: false,
        type: 'summarize',
      });
    case 'simplifyArticle':
      processText('', {
        name: 'simplifyArticle',
        highlighted: false,
        type: 'simplify',
      });
  }
});

const processText = async (text, params) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, { text, params });
};
