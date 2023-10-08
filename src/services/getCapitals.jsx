import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function getCapitals(){

    const capitalsURL = 'http://127.0.0.1:8000/api/capitals';
    const [capitals, setCapitals] = useState([]);
    const [value, setValue] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(capitalsURL);

          const data = response.data;
          setCapitals(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const totalCapital = capitals.reduce((total, capital) => total + parseFloat(capital.value), 0);
      setValue(totalCapital);
      console.log(value)
    }, [capitals]);

    return value;
};
