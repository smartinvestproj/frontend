import axios from 'axios';

export default function postCapital(newPost){
    const postURL = 'http://127.0.0.1:8000/api/capitals';

    axios.post(postURL, newPost)
      .then(response => {
        console.log('Well submitted buddy', response.data);
      })
      .catch(error => {
        console.error('Must have been an error: ', error);
        
      });
} 