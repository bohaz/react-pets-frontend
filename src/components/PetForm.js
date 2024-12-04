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
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{editingPet ? 'Update Pet' : 'Add Pet'}</h2>
      <div className="mb-4 flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{editingPet ? 'Update Pet' : 'Add Pet'}</button>
      </div>
    </form>
  );
};

export default PetForm;
