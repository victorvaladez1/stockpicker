const backendURL = "https://stockpicker-2nv6.onrender.com"; // Replace with your actual backend URL

// Handle form submission
const form = document.getElementById("investment-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const goal = document.getElementById("goal").value;
    const risk = document.getElementById("risk").value;
    const amount = document.getElementById("amount").value;

    localStorage.setItem("goal", goal);
    localStorage.setItem("risk", risk);
    localStorage.setItem("amount", amount);

    window.location.href = "/recommendations";
  });
}

// Fetch recommendations on Recommendations page
const recommendationsOutput = document.getElementById("recommendations-output");
if (recommendationsOutput) {
  const goal = localStorage.getItem("goal");
  const risk = localStorage.getItem("risk");
  const amount = localStorage.getItem("amount");

  (async () => {
    try {
      const response = await fetch(`${backendURL}/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, risk, amount }),
      });
      const data = await response.json();

      recommendationsOutput.innerHTML = `
        <h3>Stocks:</h3>
        ${data.stocks
          .map(
            (stock) => `
          <div class="card">
            <h3>${stock.symbol}</h3>
            <p>Price: $${stock.price}</p>
            <p>Change: ${stock.change_percent}%</p>
          </div>`
          )
          .join("")}
        <h3>Bonds:</h3>
        ${data.bonds
          .map(
            (bond) => `
          <div class="card">
            <h3>${bond.symbol}</h3>
            <p>Price: $${bond.price}</p>
            <p>Change: ${bond.change_percent}%</p>
          </div>`
          )
          .join("")}
      `;
    } catch (error) {
      recommendationsOutput.innerHTML = "<p>Error loading recommendations. Please try again later.</p>";
      console.error("Error fetching recommendations:", error);
    }
  })();
}
