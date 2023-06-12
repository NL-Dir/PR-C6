const btn = document.querySelector('.j-btn');

btn.addEventListener('click', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  alert(`Размер экарана: ${width} x ${height}`);
});