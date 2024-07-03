document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    updateButtonLabel();
});

function updateButtonLabel() {
    chrome.storage.local.get('corsEnabled', function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error fetching corsEnabled:', chrome.runtime.lastError);
            document.getElementById('toggle').textContent = 'Error Loading State';
            return;
        }

        console.log("Storage fetch result:", data);
        
        if (data.corsEnabled === undefined) {
            console.log('corsEnabled not found, setting default to true.');
            chrome.storage.local.set({'corsEnabled': true}, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error setting default corsEnabled:', chrome.runtime.lastError);
                    return;
                }
                document.getElementById('toggle').textContent = 'Disable CORS';
            });
        } else {
            document.getElementById('toggle').textContent = data.corsEnabled ? 'Disable CORS' : 'Enable CORS';
        }
    });
}

document.getElementById('toggle').addEventListener('click', function() {
    chrome.storage.local.get('corsEnabled', function(data) {
        var newStatus = !data.corsEnabled;
        console.log("Toggling corsEnabled to:", newStatus);

        chrome.storage.local.set({'corsEnabled': newStatus}, function() {
            if (chrome.runtime.lastError) {
                console.error('Error setting corsEnabled:', chrome.runtime.lastError);
                return;
            }
            updateButtonLabel();
        });
    });
});
