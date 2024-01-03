import React from 'react';

function TotalCalories({ totalCalories }) {
  return (
    <div className="total-calories-container">
      <div className="total-calories-label">Total Calories</div>
      <div className="total-calories-value">{totalCalories}</div>
    </div>
  );
}

export default TotalCalories;
