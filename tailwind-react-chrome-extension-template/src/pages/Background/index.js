import { get_dom_element } from '../Content';
import { contextMenuInit } from '../ContextMenu/ContextMenu';

console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('test');

chrome.runtime.onInstalled.addListener(async () => {
  contextMenuInit();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('clicked!');
  console.log(info, tab);
  console.log(info, tab);
  switch (info.menuItemId) {
    case 'summarizeText':
      summarizeText(info.selectionText);
      break;
  }
});

const summarizeText = (text) => {
  console.log(`to summarize: ${text}`);
};
