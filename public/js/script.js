document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // --- Testimonials Carousel ---
    const testimonials = [
        {
            quote: "Working with Zinara Digital transformed how families find our care. Their social media work, customer care, and online reputation management amplified our message, increased trust, and helped us connect with more families through prompt, compassionate support.",
            author: "Medvera Homecare Team",
            title: "Medvera Homecare"
        },
        {
            quote: "Zinara Digital lifted our brand visibility beyond expectations. Their content and social strategy doubled engagement and grew online sales by 250% in three months, turning our lookbook into a reliable sales channel.",
            author: "Bridget Waceke",
            title: "Managing Director, Elan Bags"
        },
        {
            quote: "Zinara Digital sold out three major events with targeted campaigns and automation. We reduced admin time by 60% and could focus on the event experience.",
            author: "Joseph Mwangi",
            title: "Founder, UrbanTribe Events"
        },
        {
            quote: "Zinara's digital overhaul boosted our monthly clients by 40% and streamlined bookings with automation, making daily operations much smoother.",
            author: "Azma Suleiman",
            title: "Operations Manager, GlamFix Beauty Parlour"
        }
    ];

    const carousel = document.querySelector('.testimonial-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let intervalId;

    function createCarousel() {
        if (!carousel || !dotsContainer) return;

        carousel.innerHTML = '';
        dotsContainer.innerHTML = '';

        testimonials.forEach((t, index) => {
            // Create Slide
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            if (index === 0) slide.classList.add('active');
            slide.innerHTML = `
                <p>"${t.quote}"</p>
                <div class="testimonial-author">
                    ${t.author}
                    <span>${t.title}</span>
                </div>
            `;
            carousel.appendChild(slide);

            // Create Dot
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');

        if (index >= slides.length) currentIndex = 0;
        if (index < 0) currentIndex = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex++;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        showSlide(currentIndex);
    }

    function startCarousel() {
        intervalId = setInterval(nextSlide, 5000); // Auto-rotate every 5 seconds
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }

    function setupCarousel() {
        createCarousel();
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const dots = document.querySelectorAll('.dot');

        if(prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });

        if(nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                showSlide(currentIndex);
                stopCarousel();
                startCarousel();
            });
        });
        
        // Re-initialize slides and dots after creation
        const slides = document.querySelectorAll('.testimonial-slide');
        if (slides.length > 0) {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
            carousel.style.transform = `translateX(0%)`;
        }

        startCarousel();
    }

    // --- AI Chatbot --- 
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

    function toggleChatbot() {
        chatbotContainer.classList.toggle('open');
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="text">${text}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleChat() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            // Simple bot response for demo
            setTimeout(() => {
                addMessage("Thanks for your message! How can I assist you further?", 'bot');
            }, 1000);
        }
    }

    function setupChatbot() {
        if (chatbotToggler) chatbotToggler.addEventListener('click', toggleChatbot);
        if (sendChatBtn) sendChatBtn.addEventListener('click', handleChat);
        if (userInput) userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleChat();
            }
        });
    }

    // Initialize all components
    setupCarousel();
    setupChatbot();
});
