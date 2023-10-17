import {base_url} from './base.js';
import axios from 'axios';

const entity = 'capitals';
const urlBuilder = (id) => id ? `${base_url}/${entity}/${id}` : `${base_url}/${entity}`;

export async function getCapital() {
    try{
        const response = await axios.get(urlBuilder());
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

export async function getCapitalById(id) {
    const response = await axios.get(urlBuilder(id));
    return response.data;
}

async function updateCapital(capital) {
    console.log('Updating capital')
    try{
        const response = await axios.put(urlBuilder(capital.id), capital);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

async function createCapital(capital) {
    try{
        const response = await axios.post(urlBuilder(), capital);
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}


export async function createOrUpdateCapital(capital) {
    if (capital.id) {
        return await updateCapital(capital);
    } else {
        return await createCapital(capital);
    }
}

export async function deleteCapital(id) {
    console.log('Deleting capital');
    try{
        const response = await axios.delete(urlBuilder(id));
        return response.data;
    }catch(error){
        errorHandler(error)
    }
}

export async function getCapitalTotalValue() {
    try{
        const response = await axios.get(`${base_url}/${entity}`);
        const capitals = response.data;
        const totalCapital = capitals.reduce((total, capital) => total + parseFloat(capital.value), 0);
        return totalCapital;
    }catch(error){
        errorHandler(error)
    }
}