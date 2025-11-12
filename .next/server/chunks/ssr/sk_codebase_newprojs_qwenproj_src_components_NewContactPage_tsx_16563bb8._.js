module.exports=[19380,a=>{"use strict";var b=a.i(54715),c=a.i(47937),d=a.i(20898),e=a.i(33080),f=a.i(28049);let g=f.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;f.default.header`
  background-color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 65px;
    max-height: 65px;
    object-fit: contain;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }

  .nav-menu {
    display: flex;
    gap: 35px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: color 0.3s ease;
    position: relative;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;

    &.active, &:hover {
      color: #c19a6b;
    }

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background: linear-gradient(to right, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      right: 0;
      background: linear-gradient(to left, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &:hover::before {
      width: 100%;
    }

    &:hover::after {
      width: 100%;
    }

    &.active::before, &.active::after {
      width: 100%;
    }
  }

  .nav-icons {
    display: flex;
    gap: 20px;
  }

  .nav-icon {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    padding: 8px;
    border-radius: 4px;
    
    &:hover {
      color: #c19a6b;
      background-color: rgba(193, 154, 107, 0.08);
      transform: translateY(-2px);
    }
  }

  .cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(135deg, #c19a6b, #a8825f);
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(193, 154, 107, 0.3);
  }

  .user-greeting {
    color: #333;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 15px;
    margin: 0 10px;
    font-weight: 500;
    text-align: right;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;let h=f.default.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 80px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    padding: 0 20px;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.4rem;
    margin: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 50vh;
    
    h1 {
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1.1rem;
    }
  }
`,i=f.default.section`
  padding: 120px 0;
  background-color: white;

  .content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }
`,j=f.default.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,k=f.default.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 25px;
    color: #222;
    font-weight: 400;
    letter-spacing: 2px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    padding-bottom: 15px;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #c19a6b;
  }

  p {
    color: #555;
    margin-bottom: 40px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.2rem;
    line-height: 1.9;
  }

  .contact-details {
    margin-bottom: 40px;
  }

  .contact-item {
    display: flex;
    margin-bottom: 35px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  .contact-icon {
    font-size: 2rem;
    color: #c19a6b;
    margin-right: 25px;
    min-width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contact-text h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .contact-text p {
    color: #666;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 0;
  }

  .social-links h3 {
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .social-icons {
    display: flex;
    gap: 18px;
    margin-top: 20px;
    
    .social-icon {
      display: inline-block;
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 1px solid #ddd;
      border-radius: 0;
      text-align: center;
      line-height: 45px;
      color: #666;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(193, 154, 107, 0.3), transparent);
        transform: translateX(-100%);
        transition: 0.6s;
      }
      
      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-5px);
        border-color: #c19a6b;
        
        &::before {
          transform: translateX(100%);
        }
      }
    }
  }
`,l=f.default.div`
  .form-header {
    margin-bottom: 30px;
  }
  
  .form-header h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    letter-spacing: 2px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    padding-bottom: 15px;
  }
  
  .form-header h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #c19a6b;
  }

  .form-header p {
    color: #555;
    margin-bottom: 35px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.2rem;
    line-height: 1.8;
  }
`,m=f.default.form`
  .btn {
    width: 100%;
    padding: 20px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(193, 154, 107, 0.4);
    position: relative;
    overflow: hidden;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.8s;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(193, 154, 107, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  .btn.primary {
    background-color: #c19a6b;
    color: white;
  }
  
  .btn.primary:hover {
    background-color: #a8825f;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 10px rgba(193, 154, 107, 0.2);
  }
`,n=f.default.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 500;
    color: #333;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
    transition: all 0.3s ease;
    background: #fff;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      box-shadow: 0 0 0 2px rgba(193, 154, 107, 0.2);
    }
  }
`,o=f.default.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,p=f.default.div`
  padding: 20px;
  border-radius: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 16px;
  border: 1px solid;
  border-left: 4px solid;

  i {
    margin-right: 15px;
    font-size: 1.4rem;
  }

  ${a=>"success"===a.type&&`
    background-color: #e8f5e9;
    color: #2e7d32;
    border-color: #a5d6a7;
  `}

  ${a=>"error"===a.type&&`
    background-color: #ffebee;
    color: #c62828;
    border-color: #ef9a9a;
  `}
`,q=f.default.div`
  margin: 120px 0;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: 70px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h2:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`,r=f.default.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  }

  .map-content {
    text-align: center;
    padding: 40px;
  }

  .map-content i {
    font-size: 4rem;
    color: #c19a6b;
    margin-bottom: 25px;
  }

  .map-content h3 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .map-content p {
    color: #666;
    margin-bottom: 30px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 18px;
  }

  .btn {
    padding: 16px 35px;
    font-size: 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    border-radius: 0;

    &.secondary {
      background-color: transparent;
      color: #c19a6b;
      border: 2px solid #c19a6b;
      
      &:hover {
        background-color: #c19a6b;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(193, 154, 107, 0.4);
      }
    }
  }
`,s=f.default.div`
  margin: 120px 0;
  text-align: center;

  h2 {
    font-size: 3rem;
    margin-bottom: 70px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h2:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`,t=f.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
`,u=f.default.div`
  text-align: left;
  background-color: white;
  border-radius: 0;
  padding: 50px 35px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: none;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.03) 0%, rgba(193,154,107,0.08) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 500;
    position: relative;
    padding-left: 30px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  h3::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 2px;
    background: #c19a6b;
  }

  p {
    color: #666;
    line-height: 1.9;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
`;f.default.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid rgba(193, 154, 107, 0.2);
    border-top: 5px solid #c19a6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,a.s(["default",0,()=>{let[a,f]=(0,c.useState)({name:"",email:"",phone:"",subject:"General Inquiry",message:""}),[v,w]=(0,c.useState)(!1),[x,y]=(0,c.useState)(!1),[z,A]=(0,c.useState)(""),B=a=>{let{name:b,value:c}=a.target;f(a=>({...a,[b]:c}))};return(0,b.jsxs)(g,{children:[(0,b.jsx)(d.default,{activePage:"contact"}),(0,b.jsx)(h,{children:(0,b.jsxs)("div",{className:"hero-content",children:[(0,b.jsx)("h1",{children:"Contact Us"}),(0,b.jsx)("p",{children:"We'd love to hear from you. Reach out to discuss your project or schedule a consultation."})]})}),(0,b.jsx)(i,{children:(0,b.jsxs)("div",{className:"content-wrapper",children:[(0,b.jsxs)(j,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)("h2",{children:"Get In Touch"}),(0,b.jsx)("p",{children:"Ready to transform your space? Schedule a complimentary consultation to discuss your project vision and discover how our design expertise can elevate your environment."}),(0,b.jsxs)("div",{className:"contact-details",children:[(0,b.jsxs)("div",{className:"contact-item",children:[(0,b.jsx)("div",{className:"contact-icon",children:(0,b.jsx)("i",{className:"fas fa-map-marker-alt"})}),(0,b.jsxs)("div",{className:"contact-text",children:[(0,b.jsx)("h3",{children:"Studio Location"}),(0,b.jsxs)("p",{children:["123 Design Avenue",(0,b.jsx)("br",{}),"Creative District, CA 90210"]})]})]}),(0,b.jsxs)("div",{className:"contact-item",children:[(0,b.jsx)("div",{className:"contact-icon",children:(0,b.jsx)("i",{className:"fas fa-phone"})}),(0,b.jsxs)("div",{className:"contact-text",children:[(0,b.jsx)("h3",{children:"Phone"}),(0,b.jsxs)("p",{children:["+1 (555) 123-4567",(0,b.jsx)("br",{}),"Mon-Fri: 9am-6pm PST"]})]})]}),(0,b.jsxs)("div",{className:"contact-item",children:[(0,b.jsx)("div",{className:"contact-icon",children:(0,b.jsx)("i",{className:"fas fa-envelope"})}),(0,b.jsxs)("div",{className:"contact-text",children:[(0,b.jsx)("h3",{children:"Email"}),(0,b.jsxs)("p",{children:["hello@colourmyspace.com",(0,b.jsx)("br",{}),"For general inquiries"]})]})]}),(0,b.jsxs)("div",{className:"contact-item",children:[(0,b.jsx)("div",{className:"contact-icon",children:(0,b.jsx)("i",{className:"fas fa-calendar-check"})}),(0,b.jsxs)("div",{className:"contact-text",children:[(0,b.jsx)("h3",{children:"Consultations"}),(0,b.jsxs)("p",{children:["Book online or call",(0,b.jsx)("br",{}),"Same-day appointments available"]})]})]})]}),(0,b.jsxs)("div",{className:"social-links",children:[(0,b.jsx)("h3",{children:"Follow Our Journey"}),(0,b.jsxs)("div",{className:"social-icons",children:[(0,b.jsx)("a",{href:"#",className:"social-icon",children:(0,b.jsx)("i",{className:"fab fa-instagram"})}),(0,b.jsx)("a",{href:"#",className:"social-icon",children:(0,b.jsx)("i",{className:"fab fa-pinterest"})}),(0,b.jsx)("a",{href:"#",className:"social-icon",children:(0,b.jsx)("i",{className:"fab fa-houzz"})}),(0,b.jsx)("a",{href:"#",className:"social-icon",children:(0,b.jsx)("i",{className:"fab fa-linkedin-in"})})]})]})]}),(0,b.jsxs)(l,{children:[(0,b.jsxs)("div",{className:"form-header",children:[(0,b.jsx)("h2",{children:"Schedule a Consultation"}),(0,b.jsx)("p",{children:"Fill out the form below and our team will contact you within 24 hours."})]}),x&&(0,b.jsxs)(p,{type:"success",children:[(0,b.jsx)("i",{className:"fas fa-check-circle"}),(0,b.jsx)("p",{children:"Thank you for your message! We'll be in touch soon."})]}),z&&(0,b.jsxs)(p,{type:"error",children:[(0,b.jsx)("i",{className:"fas fa-exclamation-circle"}),(0,b.jsx)("p",{children:z})]}),(0,b.jsxs)(m,{onSubmit:a=>{a.preventDefault(),w(!0),A(""),setTimeout(()=>{w(!1),y(!0),f({name:"",email:"",phone:"",subject:"General Inquiry",message:""}),setTimeout(()=>{y(!1)},5e3)},1500)},children:[(0,b.jsxs)(n,{children:[(0,b.jsx)("label",{htmlFor:"name",children:"Full Name *"}),(0,b.jsx)("input",{type:"text",id:"name",name:"name",value:a.name,onChange:B,required:!0})]}),(0,b.jsxs)(o,{children:[(0,b.jsxs)(n,{children:[(0,b.jsx)("label",{htmlFor:"email",children:"Email Address *"}),(0,b.jsx)("input",{type:"email",id:"email",name:"email",value:a.email,onChange:B,required:!0})]}),(0,b.jsxs)(n,{children:[(0,b.jsx)("label",{htmlFor:"phone",children:"Phone Number"}),(0,b.jsx)("input",{type:"tel",id:"phone",name:"phone",value:a.phone,onChange:B})]})]}),(0,b.jsxs)(n,{children:[(0,b.jsx)("label",{htmlFor:"subject",children:"Subject"}),(0,b.jsxs)("select",{id:"subject",name:"subject",value:a.subject,onChange:B,children:[(0,b.jsx)("option",{value:"General Inquiry",children:"General Inquiry"}),(0,b.jsx)("option",{value:"Design Consultation",children:"Design Consultation"}),(0,b.jsx)("option",{value:"Project Collaboration",children:"Project Collaboration"}),(0,b.jsx)("option",{value:"Press Inquiry",children:"Press Inquiry"}),(0,b.jsx)("option",{value:"Career Opportunity",children:"Career Opportunity"})]})]}),(0,b.jsxs)(n,{children:[(0,b.jsx)("label",{htmlFor:"message",children:"Message *"}),(0,b.jsx)("textarea",{id:"message",name:"message",rows:6,value:a.message,onChange:B,required:!0})]}),(0,b.jsx)("button",{type:"submit",className:"btn primary",disabled:v,children:v?"Sending...":"Send Message"})]})]})]}),(0,b.jsxs)(q,{children:[(0,b.jsx)("h2",{children:"Visit Our Studio"}),(0,b.jsx)(r,{children:(0,b.jsxs)("div",{className:"map-content",children:[(0,b.jsx)("i",{className:"fas fa-map-marked-alt"}),(0,b.jsx)("h3",{children:"Interactive Map"}),(0,b.jsx)("p",{children:"123 Design Avenue, Creative District, CA 90210"}),(0,b.jsx)("button",{className:"btn secondary",children:"Get Directions"})]})})]}),(0,b.jsxs)(s,{children:[(0,b.jsx)("h2",{children:"Frequently Asked Questions"}),(0,b.jsxs)(t,{children:[(0,b.jsxs)(u,{children:[(0,b.jsx)("h3",{children:"How long does the design process typically take?"}),(0,b.jsx)("p",{children:"Timeline varies by project scope. Initial consultations take 1-2 weeks, while full design projects can range from 2-6 months depending on complexity and size."})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)("h3",{children:"What is your design fee structure?"}),(0,b.jsx)("p",{children:"Fees are customized based on project scope and requirements. We offer hourly rates, flat fees, and percentage-based pricing. Consultations are complimentary."})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)("h3",{children:"Do you work with clients outside your local area?"}),(0,b.jsx)("p",{children:"Yes, we offer virtual consultations and remote design services for clients nationwide. Travel fees may apply for on-site visits outside our local region."})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)("h3",{children:"What should I prepare for our initial consultation?"}),(0,b.jsx)("p",{children:"Bring inspiration images, floor plans, measurements, and a list of priorities. Understanding your budget range upfront helps us tailor recommendations to your needs."})]})]})]})]})}),(0,b.jsx)(e.default,{})]})}],19380)}];

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_src_components_NewContactPage_tsx_16563bb8._.js.map