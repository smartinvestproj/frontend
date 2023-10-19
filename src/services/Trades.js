import {base_url} from './base.js';
import axios from 'axios';

const entity = 'trades';
const urlBuilder = (id) => id ? `${base_url}/${entity}/${id}` : `${base_url}/${entity}`;

const errorHandler = (error) => {
    console.error('API Error:', error);
    throw error;
};

export async function getTrades() {
    try{
        const response = await axios.get(urlBuilder());
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}