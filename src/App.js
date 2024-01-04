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
        console.log(result.data); // Log the raw data from CSV to see what's being parsed
        const parsedFoods = result.data.map(food => {
          const calories = parseInt(food.calories, 10);
          console.log(`Parsing: ${food.calories} to ${calories}`); // Log each parse
          return {
            name: food.name,
            calories: calories
          };
        });
        setFoods(parsedFoods);
      }
    });
  }, []);

  

  const handleFoodSelect = (index) => {
    const foodItem = foods[index];
    if (foodItem && !isNaN(foodItem.calories)) {
      setActionHistory(prevHistory => [...prevHistory, { index, calories: foodItem.calories }]);
      setTotalCalories(prevTotal => prevTotal + foodItem.calories);
    } else {
      console.error('Invalid calories value', foodItem);
    }
  };

  const handleUndo = () => {
    if (actionHistory.length > 0) {
      const newHistory = [...actionHistory];
      const lastAction = newHistory.pop();
      setActionHistory(newHistory);
      setTotalCalories(prevTotal => prevTotal - (lastAction.calories || 0));
    }
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
      <div className="title-container">
      <h1>
      Rambo's{' '} 
      <span className="animated-title">
        {"Fat-O-Meter".split('').map((char, index) => (
          <span key={index} className="letter-animation">{char}</span>
        ))}
      </span>
    </h1>
  </div>
      <div className="main-content">
        <div className="content-container">
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