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
`,a.s(["default",0,()=>{let a=(0,c.useRouter)(),{user:e}=(0,d.useAppContext)(),r=b=>{a.push(b)};return(0,b.jsx)(f,{children:(0,b.jsxs)(g,{children:[(0,b.jsxs)(h,{children:[(0,b.jsxs)(i,{children:[(0,b.jsx)(j,{children:"Colour My Space"}),(0,b.jsx)(k,{children:"Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."}),(0,b.jsxs)(l,{children:[(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-instagram"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-pinterest"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-houzz"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-linkedin-in"})})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)("h4",{children:"Awards & Recognition"}),(0,b.jsx)("p",{children:"Featured in Architectural Digest, Elle Decor, and House Beautiful"})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Quick Links"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/")},children:"Home"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/portfolio")},children:"Portfolio"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services")},children:"Services"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Shop"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/about")},children:"About"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/contact")},children:"Contact"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Services"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#residential")},children:"Residential Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#commercial")},children:"Commercial Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#space-planning")},children:"Space Planning"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#color-consulting")},children:"Color Consulting"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#furniture-design")},children:"Furniture Design"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Shop"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"All Products"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"New Arrivals"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Best Sellers"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Sale Items"})}),e&&(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/orders")},children:"Order History"})})]})]})]}),(0,b.jsx)(q,{children:(0,b.jsx)("p",{children:"© 2023 Colour My Space Interior Design. All rights reserved."})})]})})}],33080)},7579,a=>{"use strict";a.s(["calculateCartTotal",0,a=>a.reduce((a,b)=>a+("number"==typeof b.price?b.price:parseFloat(b.price||"0"))*b.quantity,0),"calculateShippingCost",0,a=>a>5e4?0:1500])},27910,a=>{"use strict";var b=a.i(54715),c=a.i(49984),d=a.i(12851),e=a.i(20898),f=a.i(33080),g=a.i(7579),h=a.i(28049);let i=h.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;h.default.div`
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
`;let j=h.default.div`
  padding: 60px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h1::after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`,k=h.default.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 40px 20px;
`,l=h.default.div`
  text-align: center;
  max-width: 600px;
  padding: 60px 40px;
  background: white;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: none;
  position: relative;
  z-index: 1;

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

  .empty-cart-icon {
    font-size: 6rem;
    color: #c19a6b;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.2rem;
    line-height: 1.7;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`,m=h.default.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 80px;
  flex: 1;
`,n=h.default.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  padding: 20px 0;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
  font-weight: 600;
  color: #555;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`,o=h.default.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`,p=h.default.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  align-items: center;
  padding: 30px;
  background: white;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    
    .header-item, .header-price, .header-quantity, .header-total {
      display: none;
    }
  }
`,q=h.default.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`,r=h.default.div`
  width: 120px;
  height: 120px;
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  border-radius: 0;
  position: relative;
  
  ${a=>"modern"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"classic"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"coastal"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"office"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"hotel"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"restaurant"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`,s=h.default.div`
  h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`,t=h.default.div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1.2rem;
  font-family: var(--font-playfair), 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`,u=h.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .quantity-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-radius: 0;
    
    &:hover {
      background: #c19a6b;
      color: white;
      border-color: #c19a6b;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    font-weight: 600;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`,v=h.default.div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1.2rem;
  font-family: var(--font-playfair), 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`,w=h.default.div`
  display: flex;
  justify-content: center;

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #c19a6b;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 10px;
  }
`,x=h.default.div`
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 0 40px 80px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 992px) {
    justify-content: center;
    padding: 0 20px 80px;
  }
`,y=h.default.div`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 0;
  padding: 40px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  position: relative;
  z-index: 1;

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
    &::before {
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #222;
    font-weight: 400;
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
`,z=h.default.div`
  margin-bottom: 30px;
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    
    span:first-child {
      color: #666;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    span:last-child {
      font-weight: 500;
      color: #222;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    &.total {
      font-weight: 600;
      font-size: 1.2rem;
      border-top: 2px solid #eee;
      margin-top: 10px;
      padding-top: 15px;
      
      span:first-child {
        color: #222;
      }
      
      span:last-child {
        color: #c19a6b;
      }
    }
  }
`,A=h.default.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .btn {
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
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
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  .btn.primary {
    background: #c19a6b;
    color: white;
    
    &:hover {
      background: #a8825f;
    }
  }
  
  .btn.secondary {
    background: transparent;
    color: #c19a6b;
    border: 2px solid #c19a6b;
    
    &:hover {
      background: #c19a6b;
      color: white;
    }
  }
`;a.s(["default",0,()=>{let a=(0,c.useRouter)(),h=b=>{a.push(b)},{cartItems:B,loading:C,error:D,updateCartItem:E,removeFromCart:F}=(0,d.useAppContext)(),G=(a,b)=>{b<1?F(a):E(a,b)},H=(0,g.calculateCartTotal)(B),I=(0,g.calculateShippingCost)(H),J=H+I,K=()=>{h("/shop")};return 0===B.length?(0,b.jsxs)(i,{children:[(0,b.jsx)(e.default,{activePage:"cart"}),(0,b.jsx)(j,{children:(0,b.jsx)("h1",{children:"Shopping Cart"})}),(0,b.jsx)(k,{children:(0,b.jsxs)(l,{children:[(0,b.jsx)("i",{className:"fas fa-shopping-cart empty-cart-icon"}),(0,b.jsx)("h2",{children:"Your cart is empty"}),(0,b.jsx)("p",{children:"Looks like you haven't added any items to your cart yet."}),(0,b.jsx)("button",{className:"btn primary",onClick:K,children:"Continue Shopping"})]})}),(0,b.jsx)(f.default,{})]}):(0,b.jsxs)(i,{children:[(0,b.jsx)(e.default,{activePage:"cart"}),(0,b.jsx)(j,{children:(0,b.jsx)("h1",{children:"Shopping Cart"})}),D.cart&&(0,b.jsx)("div",{className:"error-message",children:D.cart}),(0,b.jsxs)(m,{children:[(0,b.jsxs)(n,{children:[(0,b.jsx)("div",{className:"header-item",children:"Product"}),(0,b.jsx)("div",{className:"header-price",children:"Price"}),(0,b.jsx)("div",{className:"header-quantity",children:"Quantity"}),(0,b.jsx)("div",{className:"header-total",children:"Total"}),(0,b.jsx)("div",{className:"header-actions"})]}),(0,b.jsx)(o,{children:B.map(a=>(0,b.jsxs)(p,{children:[(0,b.jsxs)(q,{children:[(0,b.jsx)(r,{imageClass:a.imageClass||"modern"}),(0,b.jsxs)(s,{children:[(0,b.jsx)("h3",{children:a.name}),(0,b.jsx)("p",{children:a.description})]})]}),(0,b.jsxs)(t,{children:["₹","number"==typeof a.price?a.price.toLocaleString():parseFloat(a.price||"0").toLocaleString()]}),(0,b.jsxs)(u,{children:[(0,b.jsx)("button",{className:"quantity-btn",onClick:()=>G(a.id,a.quantity-1),disabled:C.cart||a.quantity<=1,children:(0,b.jsx)("i",{className:"fas fa-minus"})}),(0,b.jsx)("span",{className:"quantity",children:a.quantity}),(0,b.jsx)("button",{className:"quantity-btn",onClick:()=>G(a.id,a.quantity+1),disabled:C.cart,children:(0,b.jsx)("i",{className:"fas fa-plus"})})]}),(0,b.jsxs)(v,{children:["₹","number"==typeof a.price?(a.price*a.quantity).toLocaleString():(parseFloat(a.price||"0")*a.quantity).toLocaleString()]}),(0,b.jsx)(w,{children:(0,b.jsx)("button",{className:"remove-btn",onClick:()=>F(a.id),disabled:C.cart,children:(0,b.jsx)("i",{className:"fas fa-trash-alt"})})})]},a.id))})]}),(0,b.jsx)(x,{children:(0,b.jsxs)(y,{children:[(0,b.jsx)("h2",{children:"Order Summary"}),(0,b.jsxs)(z,{children:[(0,b.jsxs)("div",{className:"summary-row",children:[(0,b.jsx)("span",{children:"Subtotal"}),(0,b.jsxs)("span",{children:["₹",H.toLocaleString()]})]}),(0,b.jsxs)("div",{className:"summary-row",children:[(0,b.jsx)("span",{children:"Shipping"}),(0,b.jsx)("span",{children:0===I?"FREE":`₹${I.toLocaleString()}`})]}),(0,b.jsxs)("div",{className:"summary-row total",children:[(0,b.jsx)("span",{children:"Total"}),(0,b.jsxs)("span",{children:["₹",J.toLocaleString()]})]})]}),(0,b.jsxs)(A,{children:[(0,b.jsxs)("button",{className:"btn secondary",onClick:K,children:[(0,b.jsx)("i",{className:"fas fa-arrow-left"})," Continue Shopping"]}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>{B.length>0&&h("/checkout")},disabled:C.cart||0===B.length,children:"Proceed to Checkout"})]})]})}),(0,b.jsx)(f.default,{})]})}],27910)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__199be643._.js.map