const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sort");
const btn = document.getElementById("btn");
const pc = document.querySelector(".pc");

btn.addEventListener("click", async () => {
  try {
    const res = await fetch(
      "https://interveiw-mock-api.vercel.app/api/getProducts"
    );
    const data = await res.json();

    const products = data.data || [];
    productGrid.innerHTML = "";

    products.forEach((item, index) => {
      const product = item.product;

      const title = product?.title || "No Title";
      const image = product?.image?.src || "";
      const price = product?.variants?.[0]?.price || "N/A";

      const card = document.createElement("div");
      card.classList.add("card");
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <img src="${image}" alt="${title}" />
        <h3>${title}</h3>
        <p>₹${price}</p>
        <button class="cart-btn">ADD TO CART</button>
      `;

      productGrid.appendChild(card);
      btn.style.display = "none";
      pc.textContent = `${products.length} Products`;
    });
  } catch (err) {
    console.error("Error loading products:", err);
    productGrid.innerHTML = "<p>Failed to load products. Please try again.</p>";
  }
});

sortSelect.addEventListener("change", () => {
  const sortValue = sortSelect.value;
  const cards = Array.from(document.querySelectorAll(".card"));

  if (sortValue === "asc") {
    cards.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector("p").textContent.replace("₹", "")
      );
      const priceB = parseFloat(
        b.querySelector("p").textContent.replace("₹", "")
      );
      return priceA - priceB;
    });
  } else if (sortValue === "desc") {
    cards.sort((a, b) => {
      const priceA = parseFloat(
        a.querySelector("p").textContent.replace("₹", "")
      );
      const priceB = parseFloat(
        b.querySelector("p").textContent.replace("₹", "")
      );
      return priceB - priceA;
    });
  }

  productGrid.innerHTML = "";
  cards.forEach((card) => productGrid.appendChild(card));
});
