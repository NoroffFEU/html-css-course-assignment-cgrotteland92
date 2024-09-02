const apiUrl = "https://api.noroff.dev/api/v1/square-eyes";
let product = null;

async function fetchAndDisplayProductDetails(productId) {
  try {
    const response = await fetch(`${apiUrl}/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    product = await response.json();

    let priceInfo;
    if (product.onSale) {
      priceInfo = `
        <p>
          <span class="discounted-price">$${product.discountedPrice}</span>
          <span class="regular-price" style="text-decoration: line-through; color: #888;">$${product.price}</span>
        </p>
      `;
    } else {
      priceInfo = `<p>$${product.price}</p>`;
    }

    const productDetailsElement = document.getElementById("product-details");
    productDetailsElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" title="${product.name}">
      <h2>${product.title}</h2>
      <p>${product.genre}</p>
      <p>
        <i class="fa-brands fa-imdb fa-2xl" style="color: #ffffff;"></i>
        ${product.rating}
      </p>
      <p>${product.released}</p>
      ${priceInfo} <!-- Inserted the dynamic price info here -->
      <p>${product.description}</p>
    `;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

if (window.location.pathname.includes("index.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  fetchAndDisplayProductDetails(productId);
}
