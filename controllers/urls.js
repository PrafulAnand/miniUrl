const shortid = require('shortid');
const qrCodeapi = require('qrcode');
let urls = [];
const getAllUrls = (req, res) => {
    if (urls.length > 0) {
        res.send(urls);
    } else {
        res.status(404).send("No urls present")
    }
}

const redirectUrl = (req, res) => {
    const reqshortUrlId = urls.find((url) => url.shortIdVal === req.params.shortUrlId);
    if (reqshortUrlId !== undefined) {
        res.redirect(reqshortUrlId.longUrl);
    } else {
        res.status(404).send("Url does not exist");
    }

}

const addShorturl = (req, res) => {
    let urlExists = false;
    const longUrlVal = req.body.longUrl;
    if (urls.length > 0) {
        const urlValIfExists = urls.find((url) => url.longUrl == longUrlVal);
        if (urlValIfExists !== undefined) {
            urlExists = true
            res.send(urlValIfExists);
        }
    }
    if (!urlExists) {
        const generatedShortUrlID = shortid.generate();
        console.log(generatedShortUrlID);
        const newShortUrl = `https://minifiurl.herokuapp.com/urls/${generatedShortUrlID}`;
        qrCodeapi.toDataURL(newShortUrl).then(url => {
            urls.push({ longUrl: longUrlVal, shortIdVal: generatedShortUrlID, newUrl: newShortUrl });
            res.send({ newUrl: newShortUrl, imgsrc: url });
        })
        .catch(err => {
            res.send({ newUrl: newShortUrl, imgsrc: 'Unable to generate QR code' });
        })
    }
};
module.exports = { getAllUrls, redirectUrl, addShorturl };