// Define the props type
type TodoItemProps = {
  title: string;
};

// Apply the type to the props
export function TodoItem(props: TodoItemProps) {
  console.log('props: ', props); //to test our props

  return (
    <>
      <li>
        <span>{props.title}</span>
      </li>
    </>
  );
}

