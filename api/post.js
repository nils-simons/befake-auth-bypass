const axios = require("axios");
const uuid = require("uuid");
const fs = require("fs");
const { app } = require("../index");
const fileUpload = require('express-fileupload');
const FormData = require('form-data');


app.use(fileUpload({
    useTempFiles : false,
}));


app.put("/post", async (req, res) => {
    console.log("----------------------------------------------------------------");
    console.log(`/post`);
    console.log(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
    console.log(new Date());
    res.setHeader("Content-Type", "application/json");

    // console.log(req.files);
    try {
        var urlReq = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://mobile.bereal.com/api/content/posts/upload-url?mimeType=image/webp',
            headers: { 
                'Authorization': req.headers.authorization || ''
            }
        })
    } catch (error) {
        res.send("Error");
        return
    }



    var isCor = await putImg(req.files.frontImage, urlReq.data.data[0].url, urlReq.data.data[0].headers)
    console.log(isCor)

    // var isCor = await putImg(req.files.backImage, urlReq.data.data[1].url, urlReq.data.data[1].headers)
    // console.log(isCor)

    res.send("Test");
})


async function putImg(file, url, headers) {
    return new Promise(async (resolve) => {
        console.log(file)
        if (file.mimetype !== 'image/png' || file.size > (1024 * 1024)) {
            resolve(false, { error: "File is lager than 1MB" })
        }

        const uid = uuid.v4();
        await file.mv(`tmp/${uid}.png`);

        try {
            let data = new FormData();
            data.append('file', fs.createReadStream(`tmp/${uid}.png`));

            var imgResp = await axios.request({
                method: 'put',
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    ...data.getHeaders(),
                    'Cache-Control': 'public,max-age=172800', 
                    'Content-Type': 'image/webp', 
                    'x-goog-content-length-range': '1024,1048576', 
                },
                data : data
            })
            console.log(imgResp)

            resolve(true);

        } catch (error) {
            console.log(error.message)
            resolve(false);
        }
    })
}