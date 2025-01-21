interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SortSelect({ value, onValueChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="px-3 py-1 border rounded"
    >
      <option value="name">Name</option>
      <option value="rating">Rating</option>
      <option value="reviews">Reviews</option>
    </select>
  );
} 