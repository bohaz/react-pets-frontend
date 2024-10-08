import React from 'react';

const PetList = ({ pets, editPet, deletePet }) => {
  return (
    <div>
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
};

export default PetList;
