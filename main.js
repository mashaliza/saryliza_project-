document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // HERO SLIDESHOW
  // =======================
  let slideIndex = 0;
  const slides = document.querySelectorAll(".hero-slide");

  function showSlides() {
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3500);
  }

  showSlides();

  // =======================
  // ORDER MODAL
  // =======================
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".modal .close");
  const productButtons = document.querySelectorAll(".product-card button");
  const productNameInput = document.getElementById("productName");
  const quantityInput = document.getElementById("quantity");
  const totalPriceInput = document.getElementById("totalPrice");
  let currentPrice = 0;

  productButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productTitle = productCard.querySelector("h3").textContent;
      currentPrice = parseFloat(productCard.dataset.price);
      productNameInput.value = productTitle;
      quantityInput.value = 1;
      totalPriceInput.value = `$${currentPrice.toFixed(2)}`;
      modal.style.display = "block";
    });
  });

  quantityInput.addEventListener("input", () => {
    let qty = parseInt(quantityInput.value) || 1;
    totalPriceInput.value = `$${(currentPrice * qty).toFixed(2)}`;
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

  document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Thank you! Your order for "${productNameInput.value}" x ${quantityInput.value} has been placed. Total: ${totalPriceInput.value}`);
    modal.style.display = "none";
    e.target.reset();
  });

  // =======================
  // ABOUT SECTION FADE-IN
  // =======================
  const aboutElements = document.querySelectorAll("#about .about-intro, #about .feature-box");

  aboutElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.8s ease";
  });

  function revealOnScroll() {
    aboutElements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  // =======================
  // CHRISTMAS PROMO POPUP
  // =======================
  const promoPopup = document.getElementById("promoPopup");
  const promoClose = document.querySelector(".promo-close");
  const promoBadge = document.getElementById("promoBadge");
  const promoBtn = document.querySelector(".promo-btn");

  setTimeout(() => {
    promoPopup.style.display = "flex";
  }, 2000);

  function hidePopup() {
    promoPopup.style.display = "none";
    promoBadge.style.display = "block";
  }

  promoClose.addEventListener("click", hidePopup);
  promoBtn.addEventListener("click", hidePopup);

  window.addEventListener("click", (e) => {
    if (e.target === promoPopup) hidePopup();
  });

  promoBadge.addEventListener("click", () => {
    promoPopup.style.display = "flex";
  });

});
