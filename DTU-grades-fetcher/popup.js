document.getElementById('fillScore_8').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 8 });
    });
});
document.getElementById('fillScore_9').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 9 });
    });
});

document.getElementById('fillScore_10').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 10 });
    });
});
document.getElementById('fillScore_11').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 11 });
    });
});
document.getElementById('fillScore_12').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 12 });
    });
});
document.getElementById('fillScore_13').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "go", job: 13 });
    });
});

