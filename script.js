// Toggle theme
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });
  
  // Your real-looking card data
  const cardData = {
    "4532015112830366": { name: "Anirudh", mobile: "7020595585", country: "India" },
    "4716108999716531": { name: "Swaraj", mobile: "7447486452", country: "India" },
    "4485275742308326": { name: "Nayan", mobile: "7666407318", country: "India" },
    "4485275742308327": { name: "Shivam", mobile: "9322823832", country: "India" }
  };
  
  let generatedOTP = "";
  
  document.getElementById("cardForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const expiry = document.getElementById("expiry").value;
  
    if (!cardNumber || !cvv || !expiry) {
      alert("Please fill all fields!");
      return;
    }
  
    if (!luhnCheck(cardNumber)) {
      alert("❌ Invalid card number format (failed Luhn check)");
      return;
    }
    
  
    if (cardData[cardNumber]) {
      // Generate OTP
      generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      alert(`Your OTP is: ${generatedOTP}`);
  
      // Show OTP section
      document.getElementById("otpSection").style.display = "block";
    } else {
      showResult("❌ Card is not found in our database.");
    }
  });
  
  function verifyOTP() {
    const userOTP = document.getElementById("otpInput").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
  
    if (userOTP === generatedOTP && cardData[cardNumber]) {
      const details = cardData[cardNumber];
      showResult(`✅ Card Valid\n\nCard Holder: ${details.name}\nMobile: ${details.mobile}\nCountry: ${details.country}`);
    } else {
      showResult("❌ Invalid OTP. Verification failed.");
    }
  }
  
  // Luhn Algorithm to validate card numbers
  function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
  
  function showResult(message) {
    document.getElementById("result").textContent = message;
  }
  