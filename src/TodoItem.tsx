// Define the props type
type TodoItemProps = {
  title: string;
};

// Apply object structuring from the props
export function TodoItem({ title }: TodoItemProps) {
  console.log('title: ', title); //to test our props
  return (
    <>
      <li>
        <span>{title}</span> 
      </li>
    </>
  );
}
