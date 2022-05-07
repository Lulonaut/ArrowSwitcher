async function changeTab(amount) {
  await browser.tabs.query({ currentWindow: true }, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i];
      if (tab.active) {
        if (i + amount >= 0 && i + amount < tabs.length) {
          let newTabId = tabs[i + amount].id;
          browser.tabs.update(newTabId, { highlighted: true });
          browser.tabs.update(tab.id, { highlighted: false });
        }
      }
    }
  });
}

browser.commands.onCommand.addListener((command) => {
  if (command === "tab-left") {
    changeTab(-1);
  } else if (command === "tab-right") {
    changeTab(1);
  }
});
