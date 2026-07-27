document.addEventListener("DOMContentLoaded", function () {
    console.log("SCRIPT LOADED");

    // ==========================================
    // CASHFREE INITIALIZATION
    // ==========================================

    const cashfree = Cashfree({
        mode: "production"
    });

    // ==========================================
    // ELEMENTS
    // ==========================================

    const payNowBtn = document.getElementById("payNow");

    const checkoutModal = document.getElementById("checkoutModal");

    const closeModal = document.querySelector(".close-modal");

    const continuePayment = document.getElementById("continuePayment");

    const customerName = document.getElementById("customerName");

    const customerEmail = document.getElementById("customerEmail");

    const customerPhone = document.getElementById("customerPhone");

    // ==========================================
    // OPEN CHECKOUT POPUP
    // ==========================================

    if (payNowBtn) {

        payNowBtn.addEventListener("click", function () {

            checkoutModal.style.display = "flex";

        });

    }

    // ==========================================
    // CLOSE POPUP
    // ==========================================

    if (closeModal) {

        closeModal.addEventListener("click", function () {

            checkoutModal.style.display = "none";

        });

    }

    window.addEventListener("click", function (e) {

        if (e.target === checkoutModal) {

            checkoutModal.style.display = "none";

        }

    });

    // ==========================================
    // CONTINUE PAYMENT
    // ==========================================

    if (continuePayment) {

        continuePayment.addEventListener("click", async function () {

            const name = customerName.value.trim();

            const email = customerEmail.value.trim();

            const phone = customerPhone.value.trim();

            if (!name || !email || !phone) {

                alert("Please fill all details.");

                return;

            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {

                alert("Please enter a valid email.");

                return;

            }

            if (!/^[6-9]\d{9}$/.test(phone)) {

                alert("Enter a valid 10-digit mobile number.");

                return;

            }

            continuePayment.disabled = true;

            continuePayment.innerHTML = "Processing...";
                        try {

                const response = await fetch("/api/create-order", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        phone: phone

                    })

                });

                const data = await response.json();

                if (!response.ok) {

                    throw new Error(data.message || "Unable to create order.");

                }

                if (!data.payment_session_id) {

                    throw new Error("Payment Session ID not received.");

                }

                await cashfree.checkout({

                    paymentSessionId: data.payment_session_id,

                    redirectTarget: "_self"

                });

            }

            catch (error) {

                console.error(error);

                alert(error.message);

            }

            finally {

                continuePayment.disabled = false;

                continuePayment.innerHTML = "Continue to Payment";

            }

        });

    }

    // ==========================================
    // VIEW MORE
    // ==========================================

    document.querySelectorAll(".view-more").forEach(button => {

        button.addEventListener("click", function () {

            const text = this.parentElement.querySelector(".review-text");

            text.classList.toggle("expanded");

            this.innerHTML = text.classList.contains("expanded")

                ? 'View Less <i class="fa-solid fa-angle-up"></i>'

                : 'View More <i class="fa-solid fa-angle-down"></i>';

        });

    });

    // ==========================================
    // STAR RATING
    // ==========================================

    document.querySelectorAll(".review-card").forEach(card => {

        const stars = card.querySelectorAll(".star");

        const rating = card.querySelector(".rating-number");

        stars.forEach((star, index) => {

            star.addEventListener("click", () => {

                stars.forEach((s, i) => {

                    s.classList.toggle("active", i <= index);

                });

                rating.innerText = (index + 1) + ".0";

            });

        });

    });
        // ==========================================
    // LIKE
    // ==========================================

    document.querySelectorAll(".like-btn").forEach(button => {

        button.addEventListener("click", function () {

            const count = this.querySelector(".like-count");

            let value = parseInt(count.innerText);

            if (!this.classList.contains("active")) {

                value++;

                count.innerText = value;

                this.classList.add("active");

            } else {

                value--;

                count.innerText = value;

                this.classList.remove("active");

            }

        });

    });

    // ==========================================
    // DISLIKE
    // ==========================================

    document.querySelectorAll(".dislike-btn").forEach(button => {

        button.addEventListener("click", function () {

            const count = this.querySelector(".dislike-count");

            let value = parseInt(count.innerText);

            if (!this.classList.contains("active")) {

                value++;

                count.innerText = value;

                this.classList.add("active");

            } else {

                value--;

                count.innerText = value;

                this.classList.remove("active");

            }

        });

    });

});
