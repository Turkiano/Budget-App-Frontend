type Props = {
  categoryId: number;
  categoryName: string;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
};

export const CategoryActions = ({
  categoryId,
  categoryName,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <>
      <button type="button" onClick={() => onEdit(categoryId, categoryName)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(categoryId)}>
        Delete
      </button>
    </>
  );
};
