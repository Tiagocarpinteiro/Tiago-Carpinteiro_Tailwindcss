export default function Menu() {
    return {
        currentMenuId: 0,
        menuOpen: false,
        init() {
            this.assignIdsToAllSubMenus();
            window.addEventListener('resize', this.refreshVars);
        },
        refreshVars() {
            this.currentMenuId = 0;
            this.menuOpen = window.matchMedia('(min-width: 768px)').matches;
        },
        toggleMenu() {
            console.log(this.menuOpen);
            this.menuOpen = !this.menuOpen;
        },
        isMenuOpen() {
            return window.matchMedia('(min-width: 768px)').matches || this.menuOpen;
        },
        assignIdsToAllSubMenus() {
            let subMenuId = 1;

            this.$el.querySelectorAll('.sub-menu').forEach(item => {
                item.dataset.subMenuId = subMenuId;
                subMenuId++;
            });
        },
        isMenuItemOpen() {
            return this.currentMenuId === this.getSubMenuIdFromElement();
        },
        openMenuItem(event) {
            if (
                (event.type === 'click' && window.matchMedia('(min-width: 768px)').matches)
                || (event.type === 'mouseover' && window.matchMedia('(max-width: 767px)').matches)
            ) {
                return;
            }
            this.currentMenuId = this.getCurrentSubMenuId();
        },
        closeMenuItems(event) {
            if (window.matchMedia('(max-width: 767px)').matches) {
                return;
            }
            this.currentMenuId = 0;
        },
        getSubMenuIdFromElement(){
            return parseInt(this.$el.dataset.subMenuId) || 0;
        },
        getCurrentSubMenuId(){
            return parseInt(this.$el.closest('li').querySelector('.sub-menu').dataset.subMenuId);
        }
    };
};
