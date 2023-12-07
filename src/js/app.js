import Alpine from "alpinejs";
import EditorPreview from "./components/EditorPreview";
import Menu from "./components/Menu";

window.Alpine = Alpine;

window.addEventListener('DOMContentLoaded', () => {
    const {alpineInitialized, Alpine} = window;
    if (alpineInitialized) {
        return;
    }

    window.alpineInitialized = true;
    const {data, start} = Alpine;
    data('EditorPreview', EditorPreview);
    data('Menu', Menu);
    start();
});
