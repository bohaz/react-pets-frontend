import React, { useState, useEffect } from 'react';
import { fetchPets, addPet, updatePet, deletePet } from './api';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' });
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const loadPets = async () => {
      const fetchedPets = await fetchPets();
      setPets(fetchedPets);
    };
    loadPets();
  }, []);

  const handleAddPet = async (e) => {
    e.preventDefault();
    const newPet = await addPet(formData);
    setPets([...pets, newPet]);
    resetForm();
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    const updatedPet = await updatePet(editingPet.id, formData);
    setPets(pets.map(pet => (pet.id === editingPet.id ? updatedPet : pet)));
    resetForm();
  };

  const handleDeletePet = async (id) => {
    await deletePet(id);
    setPets(pets.filter(pet => pet.id !== id));
  };

  const editPet = (pet) => {
    setEditingPet(pet);
  };

  const resetForm = () => {
    setFormData({ name: '', breed: '', age: '' });
    setEditingPet(null);
  };

  return (
    <div>
      <h1>Pet Management</h1>
      <PetForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={editingPet ? handleUpdatePet : handleAddPet}
        editingPet={editingPet}
      />
      <PetList pets={pets} editPet={editPet} deletePet={handleDeletePet} />
    </div>
  );
}

export default App;
