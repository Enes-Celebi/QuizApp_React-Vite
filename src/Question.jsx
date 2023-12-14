import React, { useState, useEffect } from 'react';

function Question({ question, options, onOptionSelect, selectedOption }) {
  const [localSelectedOption, setLocalSelectedOption] = useState(null);

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
  }, [selectedOption]);

  const handleOptionClick = (optionIndex) => {
    setLocalSelectedOption(optionIndex);
    onOptionSelect(optionIndex);
  };

  return (
    <div className="question-container">
      <h3>{question}</h3>
      <ul className="options">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`option ${localSelectedOption === index ? 'selected' : ''}`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
