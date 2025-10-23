const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  if(link.href === location.href){
    link.classList.add('active');
  }
});