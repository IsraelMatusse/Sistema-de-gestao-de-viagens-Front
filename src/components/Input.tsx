import React from 'react';

interface InputProps {
  label: string;
  value: any;
  updateValue(value: any): void;
  type?: string; 
  options?: string[]; 
}

const Input = ({ value, label, updateValue, type = 'text', options }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      {options ? (
        <select value={value} onChange={(e) => updateValue(e.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type} 
          value={value}
          onChange={(e) => updateValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default Input;
