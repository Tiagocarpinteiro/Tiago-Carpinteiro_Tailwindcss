export default function Slider(images) {
    return {
        currentSlide: 0,
        images: [],

        init() {
            for (let i = 0; i < images.length; i++) {
                this.images.push({
                    id: i,
                    src: images[i],
                });
            }
        },

        next() {
            this.currentSlide++;
        },

        prev() {
            this.currentSlide--;
        },

        isFirst() {
            return this.currentSlide === 0;
        },

        isLast() {
            return this.currentSlide === this.images.length - 1;
        }
    }
}
