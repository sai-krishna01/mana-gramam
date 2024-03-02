
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