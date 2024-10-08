import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetsAsync, addPetAsync, updatePetAsync, deletePetAsync } from './store/petsSlice';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets.pets);
  const loading = useSelector((state) => state.pets.loading);
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' });
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    dispatch(fetchPetsAsync());
  }, [dispatch]);

  const handleAddPet = async (e) => {
    e.preventDefault();
    const newPet = await dispatch(addPetAsync(formData)).unwrap();
    alert(`New pet added: ${newPet.name}`);
    setFormData({ name: '', breed: '', age: '' });
};

const handleUpdatePet = async (e) => {
  e.preventDefault();
  if (editingPet) {
    try {
      await dispatch(updatePetAsync({ id: editingPet.id, data: formData })).unwrap();
      resetForm();
    } catch (error) {
      console.error("Error updating pet:", error); 
    }
  }
};

  const handleDeletePet = async (id) => {
    try {
        await dispatch(deletePetAsync(id)).unwrap();
        alert(`Pet with ID ${id} deleted`);
    } catch (error) {
        alert(`Failed to delete pet: ${error.message}`);
    }
};

  const editPet = (pet) => {
    setEditingPet(pet);
    setFormData({ name: pet.name, breed: pet.breed, age: pet.age });
  };

  const resetForm = () => {
    setFormData({ name: '', breed: '', age: '' });
    setEditingPet(null);
  };

  return (
    <div>
      <h1>Pet Management</h1>
      {loading && <p>Loading pets...</p>}
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
