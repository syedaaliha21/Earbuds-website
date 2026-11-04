
(() => {
  console.log("Product details JS is working!");

  // HOMEPAGE PRODUCT CARDS
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const image = card.querySelector(".product-image img");
    const name = card.querySelector(".product-info h3");
    const price = card.querySelector(".product-price .new-price");
    const oldPrice = card.querySelector(".product-price .old-price");

    if (!image || !name) return;

    function openDetails() {
      const params = new URLSearchParams({
        name: name.textContent.trim().replace(/\s+/g, " "),
        price: price ? price.textContent.trim() : "Price not added",
        oldPrice: oldPrice ? oldPrice.textContent.trim() : "",
        image: image.getAttribute("src") || ""
      });

      window.location.href =
        "product-details.html?" + params.toString();
    }

    card.addEventListener("click", (event) => {
      if (!event.target.closest("button, a")) {
        openDetails();
      }
    });

    card.querySelectorAll(".add-btn, .buy-now-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openDetails();
      });
    });
  });

  // PRODUCT DETAILS PAGE
  const mainImage = document.getElementById("mainProductImage");

  if (mainImage) {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name") || "BUDSLICHI Earbuds";
    const price = params.get("price") || "Price not added";
    const oldPrice = params.get("oldPrice") || "";
    const image = params.get("image") || "";

    document.title = name + " | BUDSLICHI";

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productOldPrice = document.getElementById("productOldPrice");
    const productDescription = document.getElementById("productDescription");
    const thumbMain = document.getElementById("thumbMain");

    if (productName) productName.textContent = name;
    if (productPrice) productPrice.textContent = price;
    if (productOldPrice) productOldPrice.textContent = oldPrice;

    if (productDescription) {
      productDescription.textContent =
        name + " from the BUDSLICHI collection. Explore its design and features before making your choice.";
    }

    if (image) {
      mainImage.src = image;
      if (thumbMain) thumbMain.src = image;
    }

    const extra1 = document.getElementById("thumbExtra1");
    const extra2 = document.getElementById("thumbExtra2");

    document.querySelectorAll(".thumbnail").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.image;

        if (selected === "main" && image) {
          mainImage.src = image;
        }

        if (selected === "extra1" && extra1) {
          mainImage.src = extra1.src;
        }

        if (selected === "extra2" && extra2) {
          mainImage.src = extra2.src;
        }

        document.querySelectorAll(".thumbnail").forEach((item) => {
          item.classList.remove("active");
        });

        button.classList.add("active");
      });
    });

    const addCart = document.getElementById("detailsAddCart");
    const buyNow = document.getElementById("detailsBuyNow");
    const actionMessage = document.getElementById("actionMessage");

    if (addCart && actionMessage) {
      addCart.addEventListener("click", () => {
        actionMessage.textContent =
          "Connect this button to your shopping cart system.";
      });
    }

    if (buyNow && actionMessage) {
      buyNow.addEventListener("click", () => {
        actionMessage.textContent =
          "Connect this button to your checkout page.";
      });
    }
  }
})();
