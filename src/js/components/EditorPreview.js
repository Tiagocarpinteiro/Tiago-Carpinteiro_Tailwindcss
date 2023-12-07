export default function EditorPreview() {
    return {
        open: false,
        text: '',

        init() {
            this.open = false;
            this.text = '';
        },

        toggle() {
            this.open =!this.open;
        }
    }
}
