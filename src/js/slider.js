import Swiper from "swiper";
import { Navigation } from 'swiper/modules'

// Para funcionar el css despues de la instalacion de webpack, instalar npm i -D css-loader style-loader para los swiper; gulpfile.js line 41 - 48
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', function(){
    if(document.querySelector('.slider')) {
        const opciones = {
            slidesPerView: 1,
            spaceBetween: 15,
            freeMode: true,
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            // mediaQuery o tamaños de pantalla
            breakpoints: {
                768: { // tamaño de pantalla
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                }
            }
        }

        // Swiper.use([Navigation, Pagination]);
        new Swiper('.slider', opciones);
    }
});