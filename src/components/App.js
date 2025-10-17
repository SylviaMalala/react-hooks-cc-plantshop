import { useState, useEffect } from 'react';
import Header from './Header';
import PlantCard from './PlantCard';
import NewPlantForm from './NewPlantForm';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(data => setPlants([...plants, data]));
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <main>
        <NewPlantForm onAddPlant={addPlant} />
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ul className="cards">
          {filteredPlants.map(plant => (
            <PlantCard 
              key={plant.id} 
              plant={plant} 
              onToggleSoldOut={toggleSoldOut}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;