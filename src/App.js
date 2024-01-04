import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FoodList from './FoodList';
import TotalCalories from './TotalCalories';
import './App.css';
import './fonts/mario.ttf';

function App() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [foods, setFoods] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);

  useEffect(() => {
    Papa.parse('/foodData.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setFoods(result.data.map(food => ({
          name: food.name,
          calories: parseInt(food.calories, 10)
        })));
      }
    });
  }, []);

  const handleFoodSelect = (index, calories) => {
    setActionHistory(prevHistory => [...prevHistory, { index, calories }]);
    setTotalCalories(totalCalories + calories);
  };

  const handleUndo = () => {
    const newHistory = [...actionHistory];
    const lastAction = newHistory.pop();
    setActionHistory(newHistory);
    setTotalCalories(totalCalories - (lastAction?.calories || 0));
  };

  const handleReset = () => {
    setActionHistory([]); // Clear the action history
    setTotalCalories(0);
  };

  return (
    <div className="App">
      <div className="stripes-container">
        <div className="stripe stripe-1"></div>
        <div className="stripe stripe-2"></div>
        
        <div className="stripe stripe-4"></div>
        <div className="stripe stripe-5"></div>
      </div>

      <div className="main-content">
        <div className="content-container"> {/* New wrapper div */}
          <div className="food-list-container">
            <FoodList
              foods={foods}
              onFoodSelect={handleFoodSelect}
              actionHistory={actionHistory}
            />
          </div>
          <div className="side-container">
            <TotalCalories totalCalories={totalCalories} />
            <div className="buttons-container">
              <button className="button-95" onClick={handleUndo}>Undo</button>
              <button className="button-95" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;