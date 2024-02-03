import React from 'react';

function TotalCalories({ totalCalories }) {
  // Determine the class based on totalCalories value
  const caloriesClass = totalCalories > 2400 ? 'calories-high' : 'calories-normal';

  return (
    <div className="total-calories-container">
      <div className="total-calories-label">Total Calories</div>
      {/* Apply the dynamically determined class */}
      <div className={`total-calories-value ${caloriesClass}`}>{totalCalories}</div>
    </div>
  );
}

export default TotalCalories;


