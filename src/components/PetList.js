import React from 'react';

const PetList = ({ pets, editPet, deletePet }) => {
  return (
    <div className="my-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Pets List</h2>
      <ul className="space-y-4">
        {pets && pets.length > 0 ? (
          pets.map(pet => (
            <li key={pet.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-50">
             <div>
            <p className="font-medium text-lg">{pet.name} ({pet.breed})</p>
            <p className="text-gray-500">Age: {pet.age}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => editPet(pet)}
              className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => deletePet(pet.id)}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No pets available</li>
        )}
      </ul>
    </div>
  );
};

export default PetList;
