const urlInput = document.getElementById("urlInput");
const btnShortUrlId = document.getElementById("btngenerateShortUrl");
const urlOutput = document.getElementById("resultantShortUrl");
const apiHost = window.location.origin;
const resultshortUrl = document.getElementById('resultantShortUrl');
const resetInputs = document.getElementById('resetInputs');
const btnGetRecentShortUrls = document.getElementById('getRecentUrlsButton');
const recentUrlsTable = document.getElementById('recentShortUrlsTable');
const noNewurlsContainer = document.getElementById('noNewUrlsContainer');
const shortenedUrlsContainer = document.getElementById('shortenedUrlsContainer');
const imgtag = document.getElementById('qrCodeLink');


function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
}

function appendHttpsIfMissing(url) {
    if (!url.startsWith('https://'))
        return `https://${url}`;
    else
        return url;
}

btnShortUrlId.onclick = () => {
    const urlValue = urlInput.value.toLowerCase();
    if (urlValue !== "" && isUrlValid(appendHttpsIfMissing((urlValue)))) {
        getShortUrl(appendHttpsIfMissing((urlValue)));
    } else {
        alert("Not a valid Input value");
    }
};


const postRequestData = (longUrl) =>
    fetch(`${apiHost}/urls`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            longUrl: longUrl,
        }),
    });


const getShortUrl = (longUrl) => {
    btnShortUrlId.disabled = true;
    postRequestData(longUrl)
        .then(response => response.json())
        .then(data => {
            resultshortUrl.innerText = data.newUrl;
        if(data.imgsrc === 'Unable to generate QR Code'){
imgtag.setAttribute('alt','Unable to generate QR Code');
        }else{
            imgtag.setAttribute('src', data.imgsrc);
        }
    });
};

/*reset */
resetInputs.onclick = () => {
    btnShortUrlId.disabled = false;
    urlInput.value = "";
    urlOutput.innerText = "";
    imgtag.removeAttribute('src', '');
    imgtag.setAttribute('alt','Your QR Code will Load here');
};



btnGetRecentShortUrls.onclick = () => {
    fetch(`${apiHost}/urls`)
        .then(response => response.json())
        .then(data => createTable(data))
        .catch((err) => {
            console.log(err);
            alert('Currenlty No urls have been minified. Try getting one using MiniFi Url');
        });
};

function createTable(data) {
    const tableOfUrls = document.getElementById("urlTable");
    if (typeof (tableOfUrls) != 'undefined' && tableOfUrls != null) {
        tableOfUrls.remove();
    }
    const dyNamicTable = document.createElement('table');
    dyNamicTable.setAttribute('id', 'urlTable');
    shortenedUrlsContainer.appendChild(dyNamicTable);
    const header = dyNamicTable.createTHead();
    const thead = header.insertRow();
    thead.insertCell().innerHTML = 'Mini Url';
    thead.insertCell().innerHTML = 'Long URL';
    const tbody = dyNamicTable.createTBody();
    for (let rowIndex = 0; rowIndex < data.length; ++rowIndex) {
        let row = tbody.insertRow();
        row.insertCell().innerHTML = data[rowIndex].newUrl;
        row.insertCell().innerHTML = data[rowIndex].longUrl;
    }
}