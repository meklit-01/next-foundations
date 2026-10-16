import { getDishes } from "../../lib/dishes";
import DishList from "./DishList";


export const revalidate = 60;

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div>
      <h1>Our Menu</h1>
        <DishList dishes={dishes} />
    </div>
  );
}