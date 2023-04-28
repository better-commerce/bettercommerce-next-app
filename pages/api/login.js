import axios from "axios";

export default function handler(req, res) {
    axios({
        url: 'https://auth.bettercommerce.io/oAuth/Token',
        method: 'post',
        type: 'text',
        data: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
    }).then(function (response) {
        res.status(200).json(response.data);
    }).catch(function (error) {
        res.status(403).json({ text: 'Login Failed' });
    })
}
