// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' });
  const [editingPet, setEditingPet] = useState(null);

  // Cargar las mascotas al montar el componente
  useEffect(() => {
    fetchPets();
  }, []);

  // Función para cargar mascotas
  const fetchPets = () => {
    axios.get('http://localhost:8080/mascotas')
      .then(response => setPets(response.data))
      .catch(error => console.error('Error fetching pets:', error));
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value, 10) : value
    });
  };
  

  // Agregar una nueva mascota
  const addPet = (e) => {
    e.preventDefault();
    console.log(formData);  // Verifica que formData tenga los campos correctos
    axios.post('http://localhost:8080/mascotas', formData)
      .then(response => {
        setPets([...pets, response.data]);
        setFormData({ name: '', breed: '', age: '' });
      })
      .catch(error => console.error('Error adding pet:', error));
  };
  
  

  // Actualizar una mascota existente
  const updatePet = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/mascotas/${editingPet.id}`, formData)
      .then(response => {
        const updatedPets = pets.map(pet => pet.id === editingPet.id ? response.data : pet);
        setPets(updatedPets);
        setEditingPet(null);
        setFormData({ name: '', breed: '', age: '' });
      })
      .catch(error => console.error('Error updating pet:', error));
  };

  // Eliminar una mascota
  const deletePet = (id) => {
    axios.delete(`http://localhost:8080/mascotas/${id}`)
      .then(() => {
        setPets(pets.filter(pet => pet.id !== id));
      })
      .catch(error => console.error('Error deleting pet:', error));
  };

  // Establecer mascota para editar
  const editPet = (pet) => {
    setEditingPet(pet);
    setFormData({ name: pet.name, breed: pet.breed, age: pet.age });
  };

  return (
    <div>
      <h1>Pet Management</h1>

      <form onSubmit={editingPet ? updatePet : addPet}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingPet ? 'Update Pet' : 'Add Pet'}</button>
      </form>

      <h2>Pets List</h2>
      <ul>
        {pets && pets.length > 0 ? (
          pets.map(pet => (
            <li key={pet.id}>
              {pet.name} ({pet.breed}) - Age: {pet.age}
              <button onClick={() => editPet(pet)}>Edit</button>
              <button onClick={() => deletePet(pet.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No pets available</li>
        )}
      </ul>

    </div>
  );
}

export default App;
