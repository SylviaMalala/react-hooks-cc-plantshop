function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button 
        className={plant.soldOut ? "primary" : ""}
        onClick={() => onToggleSoldOut(plant.id)}
      >
        {plant.soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;