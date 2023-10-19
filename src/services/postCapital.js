import axios from 'axios';
import { base_url } from './base';

export default function postCapital(newPost){
    const postURL = `${base_url}/capitals/`;

    axios.post(postURL, newPost)
      .then(response => {
        console.log('POST CAPITAL SUCCESS', response.data);
      })
      .catch(error => {
        console.error('POST CAPITAL ERROR: ', error);
        
      });
} 