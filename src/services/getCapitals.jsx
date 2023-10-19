import React, { useState, useEffect } from 'react';
import { base_url } from './base';
import axios from 'axios';

export default function getCapitals() {

  const capitalsURL = `${base_url}/capitals/`;
  const [capitals, setCapitals] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(capitalsURL);

        const data = response.data;
        setCapitals(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const totalCapital = capitals.reduce((total, capital) => total + parseFloat(capital.value), 0);
    setValue(totalCapital);
  }, [capitals]);

  return value;
};
