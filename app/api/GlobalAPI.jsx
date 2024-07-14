const { default: axios } = require("axios");

const sendEmail =(data)=>axios.post('/api/sendEmail', data)

export default sendEmail;