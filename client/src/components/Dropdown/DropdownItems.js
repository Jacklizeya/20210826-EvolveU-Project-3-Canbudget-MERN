import { animateScroll as scroll, scroller } from 'react-scroll';


const scrollTo = (targetEl) => {
    return () => {
        scroller.scrollTo(targetEl, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -80
        });
    }
};

export const DropdownItems = [
    {
        title: 'Promotions',
        path: '/#promotions',
        cName: 'dropdown-link',
        callback: scrollTo('promotions')
    },
    {
        title: 'Resources',
        path: '/resources',
        cName: 'dropdown-link',
    },
    {
        title: 'Our Team',
        path: '/#our-team',
        cName: 'dropdown-link',
        callback: scrollTo('our-team')
    },
];