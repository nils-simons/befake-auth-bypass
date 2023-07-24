const cors = require("cors");
const express = require("express");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8008;

app.post(`/login`, async (req, res) => {
  console.log("----------------------------------------------------------------");
  console.log(`/login`);
  console.log(req.headers["x-forwarded-for"] || req.socket.remoteAddress);
  console.log(req.body);
  console.log(new Date())
  res.setHeader("Content-Type", "application/json");

  axios({
        method: "post",
        url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyClient?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA",
        headers: {
            "x-client-version": "iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS",
            "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            appToken: "54F80A258C35A916B38A3AD83CA5DDD48A44BFE2461F90831E0F97EBA4BB2EC7",
        }),
    })
    .then(function (response) {
        axios({
            method: 'post',
            url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA',
            headers: {
                "content-type": "application/json",
                accept: "*/*",
                "x-client-version": "iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS",
                "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                "accept-language": "en",
                "user-agent":
                  "FirebaseAuth.iOS/9.6.0 AlexisBarreyat.BeReal/0.28.2 iPhone/14.7.1 hw/iPhone9_1",
                "x-firebase-locale": "en",
                "x-firebase-gmpid": "1:405768487586:ios:28c4df089ca92b89",
            },
            data: JSON.stringify({
                "iosReceipt": response.data.receipt,
                "phoneNumber": req.body.phoneNumber
            })
        })
        .then(function (response) {
            console.log('success');
            res.send(response.data)
        })
        .catch(function (error) {
            // console.log(error);
            console.log('error');

            res.sendStatus(500)
        });
    })
    .catch(function (error) {
    //   console.log(error);
        console.log('error');

        res.sendStatus(500)
    });
});

app.listen(PORT, () => {
    console.log(`API Started on *:${PORT}`);
});
