import CardCategories from "../../CardCategories";

export default function Section_2(props) {
  const { categorias } = props;

  return (
    <section className="section-categories" id="sect-2">
      <div className="section-title">Categorías</div>
      <div className="cards-container">
        {categorias.map((card) => (
          <CardCategories key={card.id} categorias={card}></CardCategories>
        ))}
      </div>
    </section>
  );
}
