import React, { useState } from 'react';
import "./Scroll.css";

const Scroll = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <i className="scrollTop bi bi-arrow-up-circle-fill arrow-up" onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none' }} />
    );
}

export default Scroll;