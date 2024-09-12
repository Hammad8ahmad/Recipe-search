// RecipeItem.js
import React from "react";
import VideoList from "./VideoList";
import "./items.css";

function RecipeItem({ recipe, video }) {
  const { image, label, calories, ingredients } = recipe;
  console.log("this is the recipeItem component", recipe);
  console.log(image);
  console.log(ingredients);
  console.log("this is the video data", video);
  // const { SMALL } = images;

  return (
    <div className="recipe">
      <h1 className="label">{label}</h1>
      <img
        loading="lazy"
        src={image}
        alt="cannot display:("
        className="recipe-image"
      />
      <h3>Calories : {Math.round(calories)}g</h3>
      <h3 className="ingredients-header">Ingredients : </h3>
      <ul>
        {ingredients.map((i, index) => (
          <li className="ingredients" key={index}>
            {i + "."}
          </li>
        ))}
      </ul>
      <VideoList videos={video} />
    </div>
  );
}

export default RecipeItem;
// https://edamam-product-images.s3.amazonaws.com/web-img/4ad/4adc20ab73fd4e7586c047e08a1a3d06-m?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLWVhc3QtMSJGMEQCIEcac2rXVNkELGuLEg5jpt8C2AyDd3u48CizI0V4zgnVAiAasZfwQAh55rXgffq4qWXikw8fMazsDnXBZINQpRHmByrCBQif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIM7sjC%2Bs7I0Bd5TTh%2FKpYFRIbkVr9BQ%2Fjc3N550apmWaVy4n1hfODgHqKVw2KKA8KnL11AzaAjd013qvc6URYrpHyiS5x8CfbOfHIBxJv0LbD9ryajP3xFZJn7fLNuTIy%2FHFAheYhnt%2B%2FfU2WGalpmI3yI31n5%2Ffav2smv2Czx9EeVqxmNRO450ZLBVzcqJdt9TQZ3vzxcEvTggzscIjsAubo%2BU%2Fkib0gP8uWluMPRqHexP6P9bnEv%2B5EZwOC3QKokw9p93yXb6lPENm0%2BYm9SKYuZneQHPKlCKfFHEH%2FKhlp2w2LCTFgrZUVN3Z0HWhidcZFmy8XYZf9ISN9UZ7io0gz%2Fpod%2BmJJacJIQXTwld3Cm%2BtChMMRjwPxvrRbmlQdjDrEtTqztIXayrcCIdgpMZ0jDNOIVJ4BLFxHAoeOC5h0B8C7kVYp5zpD1TSlKQwei2l0n%2FJmzCHLtSMCa1Ig%2BVAO%2BtgIRklROuEB6FomJlV3fyTRyAYKwdxPWZNvuMZQxD0tpRwTsP1%2FwoTHq%2FQQ78TdBvA%2Bgs2bzl5qy4bImmdN9vZsa5TrCnAIv8DbG8pp3RHtPjyIH8gWpwg8fadZr625T%2BQaICXFAYoFL55qY7k2GcDeP2V5CtdrImpgylCrn5WyQx%2B6K19yzV%2FiB50k99kHN%2BgX8wxljnu4vFdxpwKecwdNa31WbyMlSSYoyVXj904QAeo9CI1LRL3VhLaAe5soux7uJEeg9NS0Wr%2BHDgjtQZV2ouCUb2TO%2FiHN4TYa5CYggUXAX%2FVF%2BFswCGBS1CZKozB%2FmjwVZiygYp2wV6MU3lLce64UqTOkge5FPt6FLVazs4bKQshIRwnpdh%2F3A4hR4E36W9Pj8mrciQz7TrhvXUcvmEhcF1WQ4HZIHIi5omfM33Z0wm4mKtwY6sgGOA6qGnP8VuXS3xPKP%2B6HNQzpnpaAleED6ExHwUku9htfTSc8enUSvgdGtYG7p9uuxjaNcla50jC4oraTznkabv88rFN8vgBXOvitHZ0GkNqILqI%2FvmbNKnbCt4rveY5c3DUImX81MUERgz18SBxOK5%2BejCIxftzGSHUmIfiNAJU%2FjInzywhgV4TgfoBSvtarL56jjHdt7S2RdgEd%2B4BoWtChXJu6DGcI3zK8aab3DbMVq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240912T071303Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFIJPSYGOL%2F20240912%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8652e46fa89204c1aa367f6a5884568109b7ffbb2552aca5e0f81b896aaee1dc
