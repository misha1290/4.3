// Функція для ініціалізації IntersectionObserver
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const options = {
    root: null, // Відслідковуємо вікно браузера
    rootMargin: '0px', // Запас, перед тим як зображення з'явиться в зоні видимості
    threshold: 0.1 // Скільки відсотків зображення має бути видимим перед завантаженням
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src'); // Замінюємо data-src на src
        img.classList.add('loaded'); // Додаємо клас для анімації
        observer.unobserve(img); // Припиняємо спостерігати за зображенням після завантаження
      }
    });
  }, options);

  // Додаємо спостерігача для кожного зображення
  images.forEach(image => {
    imageObserver.observe(image);
  });
}

// Функція для запуску завантаження зображень після натискання кнопки
document.getElementById('load-images-btn').addEventListener('click', () => {
  lazyLoadImages(); // Запускаємо функцію лінійного завантаження
});