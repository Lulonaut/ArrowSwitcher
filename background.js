async function changeTab(amount) {
  await chrome.tabs.query({ currentWindow: true }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i];
      if (tab.active) {
        console.log(i);
        if (i + amount >= 0 && i + amount < tabs.length) {
          let newTabId = tabs[i + amount].id;
          chrome.tabs.update(newTabId, { highlighted: true });
          chrome.tabs.update(tab.id, {highlighted: false});
        }
      }
    }
  });
}

chrome.commands.onCommand.addListener((command) => {
  if (command === "tab-left") {
    changeTab(-1);
  } else if (command === "tab-right") {
    changeTab(1);
  }
});
