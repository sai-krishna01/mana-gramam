
      function openlogin(){
      let login=document.getElementById('login-form')
      let hero=document.getElementById('hero')
      let cont=document.getElementById('content')
      cont.style.display='none'
      hero.style.display='none'
      login.style.display='block'
      }

      function closelogin(){
        let close=document.getElementById('login-form')
      let card=document.getElementById('hero')
      let cont=document.getElementById('content')
      cont.style.display='block'
      card.style.display='block'
      close.style.display='none'
      }

      function contact(){
        let card=document.getElementById('hero')
      let contactus=document.getElementById('contactus')
      let cont=document.getElementById('content')
      cont.style.display='none'
      card.style.display='none'
      contactus.style.display='block'
      }

      function closecontact(){
        let card=document.getElementById('hero')
      let contactus=document.getElementById('contactus')
      let cont=document.getElementById('content')
      cont.style.display='block'
      card.style.display='block'
      contactus.style.display='none'
      }

      function signup(){
        let card=document.getElementById('hero')
      let signup=document.getElementById('signup-form')
      let cont=document.getElementById('content')
      cont.style.display='none'
      card.style.display='none'
      signup.style.display='block'
      }

      function closesignup(){
        let card=document.getElementById('hero')
      let signup=document.getElementById('signup-form')
      let cont=document.getElementById('content')
      cont.style.display='block'
      card.style.display='block'
      signup.style.display='none'

      }

      const btn = document.getElementById('button');

      document.getElementById('form')
       .addEventListener('submit', function(event) {
         event.preventDefault();
      
         btn.value = 'Sending...';
      
         const serviceID = 'service_eadh9rd';
         const templateID = 'template_4c4536t';
      
         emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            btn.value = 'Send Email';
            alert('Form submitted successfully! We will contact you soon.');
          }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
          });
      });


  let img = document.getElementById('img');

  const images = [
    "green (1).jpg",
    "green (2).jpg",
    "green (3).jpg",
    "green (5).jpg",
    "green (6).jpg",
    "green (7).jpg",
    "green (8).jpg",
    "green (9).jpg",
    "green (10).jpg",
    "green (11).jpg",
    "green (12).jpg",
    "green (13).jpg",
    "green (14).jpg",
    "green (15).jpg",
    "green (16).jpg",
    "green (17).jpg",
    "green (18).jpg",
    "green (19).jpg",
    "green (20).jpg",
    "green (21).jpg",
    "green (22).jpg",
    "green (23).jpg",
    "green (24).jpg",
  ]
  const imgElements = document.querySelectorAll('.img');
  let currentIndex = 0;
  function changeImage() {
    imgElements.forEach(img => {
      img.src = images[currentIndex];
    });
    currentIndex = (currentIndex + 1) % images.length;
  }
  changeImage();
  setInterval(changeImage, 3000);