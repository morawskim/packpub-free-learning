const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

const newBookNotify = (book) => {
    return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
        text:`Dziś za darmo książka: ${book.title}. Do dodania do konta na https://www.packtpub.com/free-learning`,
        attachments: [
            {title: book.title, image_url: book.imageUrl}
        ]
    });
};

const noFreeBookNotify = (e) => {
    return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
        text:`Nie mogę pobrać informacji o dzisiejszej darmowej książce.`,
        attachments: [
            {title: "Screenshot", image_url: `data:image/png;base64,${e.screenshot}`}
        ]
    });
};

const errorNotify = (e) => {
    return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
        text:`Błąd ${e.message}`,
        attachments: [
            {title: "Exception", text: e.toString()}
        ]
    });
};

module.exports = {newBookNotify, noFreeBookNotify, errorNotify};
