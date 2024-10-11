document.addEventListener('DOMContentLoaded', function() {
  // Hero Section Image Rotation
  const illustrations = ['two.png', 'home2.png', 'four.png', 'home1.png'];
  let currentIllustration = 0;

  function changeIllustration() {
      const illustrationElement = document.getElementById('dynamic-illustration');
      if (illustrationElement) {
          illustrationElement.style.opacity = '0';
          setTimeout(() => {
              currentIllustration = (currentIllustration + 1) % illustrations.length;
              illustrationElement.src = illustrations[currentIllustration];
              illustrationElement.style.opacity = '1';
          }, 500);
      }
  }

  setInterval(changeIllustration, 3000);

})