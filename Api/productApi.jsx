
import axios from 'axios';

const API_URL =   'https://glow-mchc.onrender.com'      //'http://localhost:5000/swaglow';


const getDataProduct = async()=>{


    const response = await axios.get('${API_URL}/ToGetProducts');
    
console.log("respooo", response)
    return response.data;
} 

export default getDataProduct;