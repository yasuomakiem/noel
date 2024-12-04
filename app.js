document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const currentDay = today.getDate();
    const days = document.querySelectorAll(".calendar-grid .day");

    days.forEach((day) => {
        const dayNumber = parseInt(day.textContent);
        if (dayNumber < currentDay) {
            day.classList.add("past");
        }
        if (dayNumber === 25) {
            day.classList.add("xmas");
        }
    });
    const countdown = () => {
        const christmas = new Date(today.getFullYear(), 11, 25); // Giáng sinh 25/12
        const now = new Date();
        const timeLeft = christmas - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    };

    countdown();
    setInterval(countdown, 1000);
    const container = document.querySelector(".container");
    const trees = document.querySelectorAll(".tree");
    const ornaments = document.querySelectorAll(".ornament");

    document.documentElement.setAttribute('data-steps', '1');

    trees.forEach((tree, i) => {
        tree.style.setProperty('--i', i);
    });

    ornaments.forEach((ornament, i) => {
        ornament.style.setProperty('--i', i * 3.6 + 12); // Maagic numbers!
    });

    const steps = document.querySelectorAll('input[type="radio"]');
    steps.forEach((step) => {
        step.addEventListener('click', (e) => {
            document.documentElement.setAttribute('data-steps', e.currentTarget.value);
        });
    });
    let currentIndex = 1; // Chỉ số hiện tại của nút radio

    // Hàm tự động chuyển nút
    function autoClick() {
        if (currentIndex < steps.length) { // Đảm bảo không vượt quá số lượng nút
            steps[currentIndex].click(); // Kích hoạt sự kiện click
            currentIndex++;
        } else {
            clearInterval(intervalId); // Dừng lại khi đã xử lý hết các nút
        }
    }

    // Gọi hàm autoClick mỗi 3 giây
    setInterval(autoClick, 1500);

    const rate = document.getElementById('rate');
    const updateRate = (e) => {
        if (container.getAnimations) {
            const animation = container.getAnimations()[0];
            if (animation) {
                animation.playbackRate = parseFloat(e.currentTarget.value);
            }
        }
    };
    rate.addEventListener('input', updateRate);


});