import { useState } from 'react';
import './style.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <div className="left_bar">
        <div className="left_option"></div>
      </div>
      <div className="left_col">

      </div>
      <div className="mid_col"></div>
      <div className="right_col"></div>
    </div>
  )
}

export default App;
