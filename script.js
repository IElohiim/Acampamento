document.addEventListener('DOMContentLoaded', function () {
 // Loading screen
 const loadingScreen = document.getElementById('loading-screen');

 // Hide loading screen after page is fully loaded
 window.addEventListener('load', function () {
  setTimeout(function () {
   loadingScreen.style.opacity = '0';
   setTimeout(function () {
    loadingScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
   }, 500);
  }, 1500); // Show loading screen for at least 1.5 seconds for better UX
 });

 // Mobile menu toggle
 const menuToggle = document.querySelector('.mobile-menu-toggle');
 const menu = document.querySelector('.menu');

 if (menuToggle && menu) {
  menuToggle.addEventListener('click', function () {
   menu.classList.toggle('active');

   // Transform hamburger to X
   const spans = menuToggle.querySelectorAll('span');
   if (menu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
   } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
   }
  });
 }

 // Close mobile menu when a nav link is clicked
 const navLinks = document.querySelectorAll('.menu a');

 navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
   if (menu.classList.contains('active')) {
    menu.classList.remove('active');

    // Reset hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
   }
  });
 });

 // Navbar scroll effect
 const header = document.querySelector('.nav');

 window.addEventListener('scroll', function () {
  if (window.scrollY > 100) {
   header.classList.add('scrolled');
  } else {
   header.classList.remove('scrolled');
  }
 });

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
   e.preventDefault();

   const targetId = this.getAttribute('href');
   if (targetId === '#') return;

   const targetElement = document.querySelector(targetId);
   if (targetElement) {
    const headerOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
     top: offsetPosition,
     behavior: 'smooth',
    });
   }
  });
 });

 // Form submission
 const inscricaoForm = document.getElementById('inscricao-form');

 if (inscricaoForm) {
  inscricaoForm.addEventListener('submit', function (e) {
   e.preventDefault();

   // Get form values
   const nome = document.getElementById('nome').value;
   const email = document.getElementById('email').value;
   const telefone = document.getElementById('telefone').value;
   const idade = document.getElementById('idade').value;
   const congregacao = document.getElementById('congregacao')
    ? document.getElementById('congregacao').value
    : '';

   // Simple form validation
   if (nome && email && telefone && idade) {
    // Send data to SheetMonkey API
    fetch('https://api.sheetmonkey.io/form/akyN5hkfryTrqsjxVrGV9K', {
     method: 'post',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      nome: nome,
      email: email,
      telefone: telefone,
      idade: idade,
      congregacao: congregacao,
     }),
    })
     .then((response) => {
      if (response.ok) {
       // Show success message
       alert(
        `Inscrição realizada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nIdade: ${idade}${
         congregacao ? '\nCongregação: ' + congregacao : ''
        }`
       );
       // Reset the form
       inscricaoForm.reset();
      } else {
       alert('Erro ao enviar o formulário. Por favor, tente novamente.');
      }
     })
     .catch((error) => {
      console.error('Erro:', error);
      alert('Erro ao enviar o formulário. Por favor, tente novamente.');
     });
   } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
   }
  });
 }
});

