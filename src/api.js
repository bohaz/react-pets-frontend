import axios from 'axios';

const API_URL = 'http://localhost:8080/mascotas';

export const fetchPets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPet = async (petData) => {
  const response = await axios.post(API_URL, petData);
  return response.data;
};

export const updatePet = async ({ id, data }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
};

export const deletePet = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
