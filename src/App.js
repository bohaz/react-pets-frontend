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
    <div className="bg-hero bg-hero-pattern min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Pet Management</h1>
        {loading && <p className="text-center text-gray-500">Loading pets...</p>}
        <PetForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={editingPet ? handleUpdatePet : handleAddPet}
          editingPet={editingPet}
        />
        <PetList pets={pets} editPet={editPet} deletePet={handleDeletePet} />
      </div>
    </div>

  );
}

export default App;
