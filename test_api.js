const apiKey = "khY0dBfiFMJ4JdLmu2j4XQw0rD0cUbd6fpnaar78"; // Using the key from env
const query = "Cheddar Cheese";

async function testApi() {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Hits:", data.totalHits);
    if (data.foods && data.foods.length > 0) {
      const food = data.foods[0];
      console.log("First Food:", food.description);
      console.log(
        "Nutrients sample:",
        JSON.stringify(food.foodNutrients.slice(0, 5), null, 2),
      );
    } else {
      console.log("No foods found");
    }
  } catch (err) {
    console.error(err);
  }
}

testApi();
