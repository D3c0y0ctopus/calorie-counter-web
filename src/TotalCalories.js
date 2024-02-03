import React from 'react';

function TotalCalories({ totalCalories }) {
  // Determine the class based on totalCalories
  const caloriesClass = totalCalories > 2400 ? 'calories-high' : 'calories-normal';

  return (
    <div className="total-calories-container">
      <span className="total-calories-label">Total Calories:</span>
      <span className={`total-calories-value ${caloriesClass}`}>{totalCalories}</span>
    </div>
  );
}

export default TotalCalories;
