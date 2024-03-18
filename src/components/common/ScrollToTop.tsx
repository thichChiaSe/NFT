import React, { useEffect, useState } from 'react';

const ScrollToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hiển thị nút khi người dùng cuộn xuống 100px
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Đăng ký sự kiện scroll
    window.addEventListener('scroll', toggleVisibility);

    // Hủy đăng ký sự kiện scroll khi component bị gỡ bỏ khỏi DOM
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top" style={{ background: 'red' }}>
      {isVisible && <button onClick={scrollToTop}>adasdasdsa</button>}
    </div>
  );
};

export default ScrollToTopComponent;
