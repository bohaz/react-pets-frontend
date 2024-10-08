import React, { useEffect } from 'react';

const PetForm = ({ formData, setFormData, onSubmit, editingPet }) => {
  useEffect(() => {
    if (editingPet) {
      setFormData({ name: editingPet.name, breed: editingPet.breed, age: editingPet.age });
    }
  }, [editingPet, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'age' ? parseInt(value, 10) : value
    }));
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default PetForm;
