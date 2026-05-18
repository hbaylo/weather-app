async function testAPI() {

  const city = "Sao Paulo";

  const url = `https://wttr.in/${city}?format=j1`;

  const response = await fetch(url);

  const data = await response.json();

  if (
    data.current_condition &&
    data.current_condition.length > 0
  ) {
    console.log("Teste passou");
  } else {
    throw new Error("Teste falhou");
  }
}

testAPI();
