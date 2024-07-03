chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      let headers = details.responseHeaders;
      for (var i = 0, l = headers.length; i < l; ++i) {
        if (headers[i].name.toLowerCase() === 'access-control-allow-origin' || headers[i].name.toLowerCase() === 'access-control-allow-credentials') {
          headers.splice(i, 1);
        }
      }
      headers.push({name: 'Access-Control-Allow-Origin', value: 'https://www.terabox.com'});
      headers.push({name: 'Access-Control-Allow-Credentials', value: 'true'});
      return {responseHeaders: headers};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "responseHeaders"]
  );
  