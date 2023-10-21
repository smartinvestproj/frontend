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

export async function getTradeById(id) {
    const response = await axios.get(urlBuilder(id));
    return response.data;
}

async function updateTrade(trade) {
    console.log('Updating trade')
    try{
        const response = await axios.put(urlBuilder(trade.id), trade);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

async function createTrade(trade) {
    try{
        const response = await axios.post(urlBuilder(), trade);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

export async function createOrUpdateTrade(trade) {
    if (trade.id) {
        return await updateTrade(trade);
    } else {
        return await createTrade(trade);
    }
}

export async function deleteTrade(id) {
    console.log('Deleting trade');
    try{
        const response = await axios.delete(urlBuilder(id));
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}