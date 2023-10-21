import {base_url} from './base.js';
import axios from 'axios';

const entity = 'stocks';
const urlBuilder = (id) => id ? `${base_url}/${entity}/${id}` : `${base_url}/${entity}`;

const errorHandler = (error) => {
    console.error('API Error:', error);
    throw error;
}

export async function getStocks() {
    try{
        const response = await axios.get(urlBuilder());
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

export async function getStockById(id) {
    const response = await axios.get(urlBuilder(id));
    return response.data;
}

async function updateStock(stock) {
    console.log('Updating stock')
    try{
        const response = await axios.put(urlBuilder(stock.id), stock);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

async function createStock(stock) {
    try{
        const response = await axios.post(urlBuilder(), stock);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

export async function createOrUpdateStock(stock) {
    if (stock.id) {
        return await updateStock(stock);
    } else {
        return await createStock(stock);
    }
}

export async function deleteStock(id) {
    console.log('Deleting stock');
    try{
        const response = await axios.delete(urlBuilder(id));
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}