const axios = require("axios");

async function main() {
  let currency = "USD";
  if (process.argv[2]) {
    currency = process.argv[2].toUpperCase();
  }
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    if (!response.data.bpi[currency]) {
      throw new Error("Devise inconnue");
    }
    const updateAt = response.data.time.updated;
    const rate = response.data.bpi[currency].rate;
    console.log(`> 1 btc = ${rate} ${currency} (${updateAt})`);
  } catch (err) {
    console.log(err.toString());
  }
}

main();
setInterval(() => {
  main();
}, 60000);
