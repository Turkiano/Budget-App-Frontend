import React from "react";

// Define the props type
type TodoItemProps = {
  title: string;
};

// Apply object structuring from the props
export function TodoItem({ title }: TodoItemProps) {
  //01. Declare the variable that has the useRef method
  const hasLogged = React.useRef(false);
//02. add the condition to log only first render
  if (!hasLogged.current) {
    console.log('title: ', title); //to test our props
    hasLogged.current = true;
  }
  return (
    <>
      <li>
        <span>{title}</span> 
      </li>
    </>
  );
}
