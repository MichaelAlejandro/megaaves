// Configuración del slider
const sliderConfig = {
    images: [
        {
            url: 'assets/images/slider/image1.png',
            title: 'Título 1',
            description: 'Descripción 1'
        },
        {
            url: 'path/to/image2.jpg',
            title: 'Título 2',
            description: 'Descripción 2'
        },
        {
            url: 'path/to/image2.jpg',
            title: 'Título 3',
            description: 'Descripción 3'
        }
        // Agregar más imágenes según sea necesario
    ],
    interval: 8000 // 8 segundos
};

class Slider {
    constructor(config) {
        this.config = config;
        this.currentSlide = 0;
        this.container = document.querySelector('.slider-container');
        this.title = document.querySelector('.slider-title');
        this.description = document.querySelector('.slider-description');
        this.dotsContainer = document.querySelector('.interactive-btns');
        this.timer = null;
        
        this.init();
    }

    init() {
        // Crear dots
        this.config.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetTimer(); // Reinicia el timer al hacer clic
            });
            this.dotsContainer.appendChild(dot);
        });

        // Iniciar slider
        this.updateSlide();
        this.startAutoplay();
    }

    updateSlide() {
        const slide = this.config.images[this.currentSlide];
        this.container.style.backgroundImage = `url(${slide.url})`;
        this.title.textContent = slide.title;
        this.description.textContent = slide.description;

        // Actualizar dots
        const dots = this.dotsContainer.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.config.images.length;
        this.updateSlide();
    }

    resetTimer() {
        // Limpiar el temporizador existente
        if (this.timer) {
            clearInterval(this.timer);
        }
        // Iniciar un nuevo temporizador
        this.startAutoplay();
    }

    startAutoplay() {
        // Guardar la referencia del temporizador
        this.timer = setInterval(() => this.nextSlide(), this.config.interval);
    }

    // Método para limpiar el timer (útil cuando se destruye el slider)
    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}

// Inicializar el slider cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider(sliderConfig);

    // Opcional: Limpiar el timer cuando se desmonte el componente
    window.addEventListener('unload', () => {
        slider.destroy();
    });
});