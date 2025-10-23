import CategoryTile from "./CategoryTile.jsx";

export default function CategoryRail({ items=[], onClick }) {
  return (
    <div className="cat-rail">
      {items.map(c => <CategoryTile key={c.id} cat={c} onClick={onClick} />)}
    </div>
  );
}
