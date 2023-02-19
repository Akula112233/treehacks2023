
export const contextMenuInit = () => {
  console.log('Created summarize menu');
  chrome.contextMenus.create({
    id: 'summarizeText',
    title: 'Summarize',
    type: 'normal',
    contexts: ['selection'],
  });

  //   chrome.contextMenus.create({
  //     id: 'simplifyText',
  //     title: 'Simplify',
  //     type: 'normal',
  //     contexts: ['selection'],
  //   });

  chrome.contextMenus.create({
    id: 'simplifyArticle',
    title: 'Simplify Article (Full)',
    type: 'normal',
  });

  chrome.contextMenus.create({
    id: 'summarizeArticle',
    title: 'Summarize Article (Full)',
    type: 'normal',
  });
};
