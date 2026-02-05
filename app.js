// Update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// CTA button interaction (makes the page "functional")
const ctaBtn = document.getElementById("ctaBtn");
const ctaMessage = document.getElementById("ctaMessage");

ctaBtn.addEventListener("click", () => {
  ctaMessage.textContent = "✅ Thanks! Your demo CTA worked. Now check Pricing below 👇";
  document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
});

// Pricing button interaction
const pricingMessage = document.getElementById("pricingMessage");
document.querySelectorAll(".priceBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    pricingMessage.textContent = `You selected: ${plan}. (Demo interaction ✅)`;
  });
});
