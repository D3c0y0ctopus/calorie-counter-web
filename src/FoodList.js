import React from 'react';

function FoodList({ onFoodSelect, foods }) {
  return (
    <div>
      {foods.map((food, index) => (
        <div key={index} className="food-item" onClick={() => onFoodSelect(food.calories)}>
          {food.name}
        </div>
      ))}
    </div>
  );
}


export default FoodList;
