import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FoodList from './FoodList';
import TotalCalories from './TotalCalories';
import './App.css';

function App() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [foods, setFoods] = useState([]);
  const [caloriesHistory, setCaloriesHistory] = useState([]);

  useEffect(() => {
    Papa.parse('/foodData.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Process and set the data in state
        setFoods(result.data.map(food => ({
          name: food.name,
          calories: parseInt(food.calories, 10)
        })));
      }
    });
  }, []);

  const handleFoodSelect = (calories) => {
    setCaloriesHistory(prevHistory => [...prevHistory, totalCalories]);
    setTotalCalories(totalCalories + calories);
  };

  const handleUndo = () => {
    setCaloriesHistory(prevHistory => prevHistory.slice(0, -1));
    setTotalCalories(caloriesHistory[caloriesHistory.length - 1] || 0);
  };

  const handleReset = () => {
    setCaloriesHistory([]);
    setTotalCalories(0);
  };

  return (
    <div className="App">
      <FoodList foods={foods} onFoodSelect={handleFoodSelect} />
      <TotalCalories totalCalories={totalCalories} />
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );

}

export default App;
