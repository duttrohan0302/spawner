import axios from 'axios';

async function getMessage () {
    console.log("react funcS")
		return await axios.get('/hello');
	}

const funcs = {
    getMessage
}
export default funcs;