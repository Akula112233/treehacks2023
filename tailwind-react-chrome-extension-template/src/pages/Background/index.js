import { get_dom_element } from '../Content';
import { contextMenuInit } from '../ContextMenu/ContextMenu';

console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('test');

chrome.runtime.onInstalled.addListener(async () => {
  contextMenuInit();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case 'summarizeText':
      summarizeText(info.selectionText);
      break;
  }
});

const summarizeText = async (text) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, { text });
  // console.log(response);
  // console.log(`to summarize: ${text}`);
};
