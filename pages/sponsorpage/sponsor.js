document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     SPONSOR TIER ANIMATIONS
  ======================= */
  const sponsorCards = document.querySelectorAll(".sponsor-tier-card");

  if ("IntersectionObserver" in window && sponsorCards.length) {
    const cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add("in-view");

            const logos = card.querySelectorAll(".sponsor-logo");
            const benefits = card.querySelectorAll(".tier-benefits li");

            logos.forEach((logo, i) => {
              logo.style.transitionDelay = `${0.1 * (i + 1)}s`;
            });

            benefits.forEach((item, i) => {
              item.style.transitionDelay = `${0.15 * (logos.length + i + 1)}s`;
            });

            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    sponsorCards.forEach(card => cardObserver.observe(card));
  } else {
    sponsorCards.forEach(card => card.classList.add("in-view"));
  }

  /* =======================
     CONTACT FORM SUBMISSION
  ======================= */
  const form = document.getElementById("sponsorForm");
  const formMessage = document.getElementById("formMessage");

  if (form && formMessage) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        access_key: "470a65df-bb10-4b57-90e1-e2f9750e6e74",
        name: form.name.value,
        email: form.email.value,
        company: form.company.value,
        message: form.message.value,
      };

      formMessage.textContent = "Sending...";
      formMessage.style.opacity = 1;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          formMessage.textContent = "Thank you! Your inquiry has been sent.";
          form.reset();
        } else {
          formMessage.textContent = "Oops! Something went wrong. Please try again.";
        }
      } catch (error) {
        console.error(error);
        formMessage.textContent = "Error sending the form. Please try again.";
      }

      setTimeout(() => {
        formMessage.style.transition = "opacity 0.6s ease";
        formMessage.style.opacity = 0;

        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.style.opacity = 1;
        }, 600);
      }, 4000);
    });
  }

  /* =======================
     CONTACT FORM ANIMATION
  ======================= */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            contactForm.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(contactForm);
  } else if (contactForm) {
    contactForm.classList.add("in-view");
  }

  /* =======================
     FUNDING PROGRESS
  ======================= */
  const ctx = document.getElementById('fundingChart');
  const amountRaisedEl = document.getElementById('amountRaised');
  const goalTextEl = document.getElementById('goalText');

  function initFundingChart() {
    if (!ctx || !amountRaisedEl || !goalTextEl || typeof Chart === 'undefined') {
      return;
    }

    const raised = 1000;
    const goal = 30000;
    goalTextEl.textContent = `of $${goal.toLocaleString()} goal`;

    let current = 0;
    const duration = 1500;
    const fps = 60;
    const step = raised / (duration / (1000 / fps));

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [0, goal],
          backgroundColor: ['#500000', 'lightgray'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        animation: { duration: 0 }
      }
    });

    const animateChart = () => {
      const interval = setInterval(() => {
        current += step;
        if (current >= raised) {
          current = raised;
          clearInterval(interval);
        }

        chart.data.datasets[0].data = [current, goal - current];
        chart.update();
        amountRaisedEl.textContent = `$${Math.floor(current).toLocaleString()}`;
      }, 1000 / fps);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animateChart();
          observer.unobserve(ctx);
        }
      }, { threshold: 0.4 });

      observer.observe(ctx);
    } else {
      animateChart();
    }
  }

  if (typeof Chart !== 'undefined') {
    initFundingChart();
  } else {
    const chartScript = document.querySelector('script[src*="chart.js"]');
    if (chartScript) {
      chartScript.addEventListener('load', initFundingChart, { once: true });
    }
  }
});

function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}