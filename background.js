chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError.message);
            return; // 退出处理器
        }
        if (!corsEnabled) return;
        console.log('开始使用 CORS');
        console.log('Original headers:', details.responseHeaders); // 输出原始头部信息
        let headers = details.responseHeaders;
        for (var i = headers.length - 1; i >= 0; i--) {
            if (headers[i].name.toLowerCase() === 'access-control-allow-origin' || headers[i].name.toLowerCase() === 'access-control-allow-credentials') {
                headers.splice(i, 1);
            }
        }
        headers.push({ name: 'Access-Control-Allow-Origin', value: 'https://www.terabox.com' });
        headers.push({ name: 'Access-Control-Allow-Credentials', value: 'true' });
        console.log('Modified headers:', headers); // 输出修改后的头部信息
        return { responseHeaders: headers };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
);
chrome.storage.local.get('corsEnabled', function(data) {
    corsEnabled = data.corsEnabled;
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        if (key === 'corsEnabled') {
            corsEnabled = storageChange.newValue;
        }
    }
});
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({'corsEnabled': true}); // 默认启用 CORS
});