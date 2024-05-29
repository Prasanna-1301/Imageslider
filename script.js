const initSlider = () => {
    const imageLIst = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageLIst.scrollWidth - imageLIst.clientWidth;

    scrollbarThumb.addEventListener("mousedown",(e) =>{
        const startX= e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) =>{
            const deltaX = e.clientX - startX;
            const newThumbPosition =thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition,newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageLIst.maxScrollLeft = scrollPosition;
        }

        const handleMouseUp = () =>{
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("mouseup",handleMouseUp);
        }

        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseUp);
    });

    slideButtons.forEach(button =>{
        button.addEventListener("click", () =>{
            const direction = button.id ==="prev-slide" ? -1 : 1;
            const scrollAmount= imageLIst.clientWidth * direction;
            imageLIst.scrollBy({ left:scrollAmount,behavior: "smooth"});
        });
    });

    const handleSlideButtons =() =>{
        slideButtons[0].style.display = imageLIst.ScrollLeft <= 0?"none" : "flex";
        slideButtons[1].style.display = imageLIst.ScrollLeft >= maxScrollLeft?"none" : "flex";
    }

    const updateScrollThumbPosition = () =>{
        const scrollPosition = imageLIst.scrollLeft;
        const thumbPosition = (scrollPosition/maxScrollLeft) * (sliderScrollbar.clientWidth-scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left=`${thumbPosition}px`;
    }
    imageLIst.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

}

window.addEventListener("resize",initSlider);
window.addEventListener("load",initSlider);