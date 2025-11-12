module.exports=[56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},66620,(a,b,c)=>{"use strict";b.exports=a.r(81211).vendored.contexts.AppRouterContext},2086,(a,b,c)=>{"use strict";b.exports=a.r(81211).vendored.contexts.HooksClientContext},45895,(a,b,c)=>{"use strict";b.exports=a.r(81211).vendored.contexts.ServerInsertedHtml},88947,(a,b,c)=>{b.exports=a.x("stream",()=>require("stream"))},33080,a=>{"use strict";var b=a.i(54715),c=a.i(49984),d=a.i(12851),e=a.i(28049);let f=e.default.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  color: #fff;
  padding: 80px 0 0;
  margin-top: auto;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    padding: 60px 0 0;
  }
`,g=e.default.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 40px;
  
  @media (max-width: 768px) {
    padding: 0 20px 30px;
  }
`,h=e.default.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-bottom: 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`,i=e.default.div`
  &:nth-child(1) {
    grid-column: span 1;
    
    @media (max-width: 992px) {
      grid-column: span 2;
    }
  }
`,j=e.default.h3`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 20px;
  color: #fff;
  letter-spacing: 1px;
`,k=e.default.p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 15px;
`,l=e.default.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #c19a6b;
      transform: translateY(-3px);
    }
  }
`,m=e.default.div`
  h4 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #c19a6b;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  
  p {
    color: #aaa;
    font-size: 14px;
    line-height: 1.6;
  }
`,n=e.default.h4`
  font-size: 18px;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  padding-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, #c19a6b, transparent);
  }
`,o=e.default.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,p=e.default.li`
  margin-bottom: 15px;
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 15px;
    font-size: 15px;
    
    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #c19a6b;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover {
      color: #c19a6b;
      padding-left: 20px;
      
      &::before {
        opacity: 1;
        left: 5px;
      }
    }
  }
`,q=e.default.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px 0;
  text-align: center;
  margin-top: 40px;
  
  p {
    color: #aaa;
    font-size: 14px;
    margin: 0;
  }
`;e.default.div`
  margin-bottom: 30px;
  
  h4 {
    margin-bottom: 15px;
  }
  
  .newsletter-form {
    display: flex;
    gap: 10px;
    
    input {
      flex: 1;
      padding: 12px 15px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
    }
    
    button {
      background: #c19a6b;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #a8825f;
      }
    }
  }
`,a.s(["default",0,()=>{let a=(0,c.useRouter)(),{user:e}=(0,d.useAppContext)(),r=b=>{a.push(b)};return(0,b.jsx)(f,{children:(0,b.jsxs)(g,{children:[(0,b.jsxs)(h,{children:[(0,b.jsxs)(i,{children:[(0,b.jsx)(j,{children:"Colour My Space"}),(0,b.jsx)(k,{children:"Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."}),(0,b.jsxs)(l,{children:[(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-instagram"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-pinterest"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-houzz"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-linkedin-in"})})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)("h4",{children:"Awards & Recognition"}),(0,b.jsx)("p",{children:"Featured in Architectural Digest, Elle Decor, and House Beautiful"})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Quick Links"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/")},children:"Home"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/portfolio")},children:"Portfolio"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services")},children:"Services"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Shop"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/about")},children:"About"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/contact")},children:"Contact"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Services"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#residential")},children:"Residential Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#commercial")},children:"Commercial Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#space-planning")},children:"Space Planning"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#color-consulting")},children:"Color Consulting"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#furniture-design")},children:"Furniture Design"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Shop"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"All Products"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"New Arrivals"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Best Sellers"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Sale Items"})}),e&&(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/orders")},children:"Order History"})})]})]})]}),(0,b.jsx)(q,{children:(0,b.jsx)("p",{children:"© 2023 Colour My Space Interior Design. All rights reserved."})})]})})}],33080)},97202,a=>{"use strict";var b=a.i(54715),c=a.i(20898),d=a.i(33080),e=a.i(28049);let f=e.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;e.default.nav`
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
`;let g=e.default.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url('https://images.unsplash.com/photo-1512474985975-3deb0e7b2431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 70vh;
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

  .container {
    position: relative;
    z-index: 1;
    max-width: 900px;
    padding: 0 20px;
    text-align: center;
  }

  h1 {
    font-size: 4.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.5rem;
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
`,h=e.default.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }
`,i=e.default.div`
  text-align: center;
  margin-bottom: 100px;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 30px;
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
  
  p {
    font-size: 1.3rem;
    line-height: 1.9;
    color: #555;
    max-width: 800px;
    margin: 0 auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`,j=e.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  justify-content: center;
  margin-bottom: 100px;
`,k=e.default.div`
  background-color: white;
  border-radius: 0;
  padding: 50px 30px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c19a6b, #a8825f);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    z-index: 2;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.9rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    z-index: 3;
  }

  p {
    color: #666;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
    position: relative;
    z-index: 3;
  }
`,l=e.default.div`
  font-size: 4rem;
  color: #c19a6b;
  margin-bottom: 25px;
  transition: transform 0.4s ease;
  position: relative;
  z-index: 3;
  
  ${k}:hover & {
    transform: translateY(-8px);
  }
`,m=e.default.div`
  text-align: center;
  margin-bottom: 100px;
  
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
`,n=e.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  justify-content: center;
`,o=e.default.div`
  position: relative;
  padding: 30px 20px;
  
  .step-number {
    font-size: 2.5rem;
    font-weight: 600;
    color: #c19a6b;
    margin-bottom: 20px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  h3 {
    font-size: 1.7rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  p {
    color: #666;
    line-height: 1.7;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
`,p=e.default.section`
  padding: 150px 0;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0, transparent 70%);
    z-index: 0;
  }

  .centered-text {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto 50px;
    padding: 0 20px;
  }

  h2 {
    font-size: 3.5rem;
    margin-bottom: 30px;
    color: white;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 50px;
    color: #ddd;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    line-height: 1.9;
    letter-spacing: 0.5px;
  }

  .btn {
    position: relative;
    overflow: hidden;
    z-index: 1;
    background-color: #c19a6b;
    color: white;
    padding: 22px 60px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 8px 25px rgba(193, 154, 107, 0.4);
    display: inline-block;
    margin: 0 auto;
    border-radius: 0;
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
      z-index: -1;
    }

    &:hover {
      background-color: #a8825f;
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(193, 154, 107, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
`;a.s(["default",0,()=>(0,b.jsxs)(f,{children:[(0,b.jsx)(c.default,{activePage:"services"}),(0,b.jsx)(g,{children:(0,b.jsxs)("div",{className:"container",children:[(0,b.jsx)("h1",{children:"Our Services"}),(0,b.jsx)("p",{children:"Elevating interiors with timeless elegance and functional design"})]})}),(0,b.jsx)(h,{children:(0,b.jsxs)("div",{className:"container",children:[(0,b.jsxs)(i,{children:[(0,b.jsx)("h2",{children:"Comprehensive Design Solutions"}),(0,b.jsx)("p",{children:"At Colour My Space, we offer a full range of interior design services tailored to meet your unique needs and lifestyle. From conceptualization to completion, our expert team guides you through every step of the design process."})]}),(0,b.jsxs)(j,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-pencil-ruler"})}),(0,b.jsx)("h3",{children:"Design Consultation"}),(0,b.jsx)("p",{children:"Comprehensive design planning and concept development tailored to your vision and lifestyle."})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-couch"})}),(0,b.jsx)("h3",{children:"Furniture Design"}),(0,b.jsx)("p",{children:"Custom furniture pieces crafted to your specifications with premium materials and craftsmanship."})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-home"})}),(0,b.jsx)("h3",{children:"Space Planning"}),(0,b.jsx)("p",{children:"Optimizing layouts for flow and functionality to maximize your space potential."})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-paint-roller"})}),(0,b.jsx)("h3",{children:"Color Consulting"}),(0,b.jsx)("p",{children:"Expert color selection for mood and ambiance that reflects your personal style."})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-lightbulb"})}),(0,b.jsx)("h3",{children:"Lighting Design"}),(0,b.jsx)("p",{children:"Strategic lighting solutions for every space to enhance functionality and atmosphere."})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{children:(0,b.jsx)("i",{className:"fas fa-project-diagram"})}),(0,b.jsx)("h3",{children:"Project Management"}),(0,b.jsx)("p",{children:"End-to-end oversight from concept to completion with attention to detail and timeline."})]})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)("h2",{children:"Our Design Process"}),(0,b.jsxs)(n,{children:[(0,b.jsxs)(o,{children:[(0,b.jsx)("div",{className:"step-number",children:"1"}),(0,b.jsx)("h3",{children:"Discovery"}),(0,b.jsx)("p",{children:"Understanding your needs, preferences, and lifestyle through in-depth consultation."})]}),(0,b.jsxs)(o,{children:[(0,b.jsx)("div",{className:"step-number",children:"2"}),(0,b.jsx)("h3",{children:"Conceptualization"}),(0,b.jsx)("p",{children:"Developing initial concepts and mood boards that capture your vision."})]}),(0,b.jsxs)(o,{children:[(0,b.jsx)("div",{className:"step-number",children:"3"}),(0,b.jsx)("h3",{children:"Design Development"}),(0,b.jsx)("p",{children:"Refining concepts into detailed plans with material selections and specifications."})]}),(0,b.jsxs)(o,{children:[(0,b.jsx)("div",{className:"step-number",children:"4"}),(0,b.jsx)("h3",{children:"Implementation"}),(0,b.jsx)("p",{children:"Bringing the design to life with careful project management and quality oversight."})]})]})]}),(0,b.jsxs)(p,{children:[(0,b.jsxs)("div",{className:"centered-text",children:[(0,b.jsx)("h2",{children:"Ready to transform your space?"}),(0,b.jsx)("p",{children:"Schedule a complimentary 30-minute consultation to discuss your project vision."})]}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>{let a=document.getElementById("contact");a&&a.scrollIntoView({behavior:"smooth"})},children:"Book Consultation"})]})]})}),(0,b.jsx)(d.default,{})]})],97202)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__7fa9998f._.js.map