import React from 'react';

function FoodList({ onFoodSelect, foods, actionHistory }) {
  const isHighlighted = (index) => {
    return actionHistory.some(action => action.index === index);
  };

  return (
    <div>
      {foods.map((food, index) => (
        <div
          key={index}
          className={`food-item ${isHighlighted(index) ? 'selected' : ''}`}
          onClick={() => onFoodSelect(index, food.calories)}
        >
          {food.name}
        </div>
      ))}
    </div>
  );
}


export default FoodList;
