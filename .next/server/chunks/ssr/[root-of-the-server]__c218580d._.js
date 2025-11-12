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
`,a.s(["default",0,()=>{let a=(0,c.useRouter)(),{user:e}=(0,d.useAppContext)(),r=b=>{a.push(b)};return(0,b.jsx)(f,{children:(0,b.jsxs)(g,{children:[(0,b.jsxs)(h,{children:[(0,b.jsxs)(i,{children:[(0,b.jsx)(j,{children:"Colour My Space"}),(0,b.jsx)(k,{children:"Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."}),(0,b.jsxs)(l,{children:[(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-instagram"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-pinterest"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-houzz"})}),(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault()},children:(0,b.jsx)("i",{className:"fab fa-linkedin-in"})})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)("h4",{children:"Awards & Recognition"}),(0,b.jsx)("p",{children:"Featured in Architectural Digest, Elle Decor, and House Beautiful"})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Quick Links"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/")},children:"Home"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/portfolio")},children:"Portfolio"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services")},children:"Services"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Shop"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/about")},children:"About"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/contact")},children:"Contact"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Services"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#residential")},children:"Residential Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#commercial")},children:"Commercial Design"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#space-planning")},children:"Space Planning"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#color-consulting")},children:"Color Consulting"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/services#furniture-design")},children:"Furniture Design"})})]})]}),(0,b.jsxs)(i,{children:[(0,b.jsx)(n,{children:"Shop"}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"All Products"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"New Arrivals"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Best Sellers"})}),(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/shop")},children:"Sale Items"})}),e&&(0,b.jsx)(p,{children:(0,b.jsx)("a",{href:"#",onClick:a=>{a.preventDefault(),r("/orders")},children:"Order History"})})]})]})]}),(0,b.jsx)(q,{children:(0,b.jsx)("p",{children:"© 2023 Colour My Space Interior Design. All rights reserved."})})]})})}],33080)},13937,a=>{"use strict";var b=a.i(54715),c=a.i(12851),d=a.i(28049);let e="#c19a6b",f="#333",g="#666",h="#222",i="768px",j=d.default.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`,k=d.default.div`
  position: relative;
  background-color: white;
  border-radius: 0;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`,l=d.default.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${f};
  cursor: pointer;
  z-index: 10;
  padding: 5px;
  
  &:hover {
    color: ${e};
  }
`,m=d.default.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${i}) {
    flex-direction: row;
  }
`,n=d.default.div`
  height: 300px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  
  @media (min-width: ${i}) {
    width: 50%;
    height: auto;
  }
  
  ${a=>"modern"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"classic"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${a=>"coastal"===a.imageClass&&`
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
`,o=d.default.div`
  padding: 30px;
  
  @media (min-width: ${i}) {
    width: 50%;
    padding: 40px;
  }
`,p=d.default.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${h};
  font-weight: 400;
  
  @media (min-width: ${i}) {
    font-size: 2rem;
  }
`,q=d.default.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${e};
  margin-bottom: 20px;
`,r=d.default.p`
  color: ${g};
  margin-bottom: 30px;
  line-height: 1.8;
`,s=d.default.div`
  margin-top: 20px;
`,t=d.default.div`
  color: #e74c3c;
  background-color: #fdf2f2;
  padding: 10px 15px;
  border-left: 4px solid #e74c3c;
  margin-bottom: 20px;
  font-family: ${"'Montserrat', 'Arial', sans-serif"};
  font-size: 14px;
`;a.s(["default",0,({product:a,onBack:d})=>{let{loading:e,error:f,addToCart:g}=(0,c.useAppContext)();return a?(0,b.jsx)(j,{children:(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{onClick:d,children:(0,b.jsx)("i",{className:"fas fa-times"})}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{imageClass:a.imageClass}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:a.name}),(0,b.jsxs)(q,{children:["₹",a.price.toLocaleString()]}),(0,b.jsx)(r,{children:a.description}),f.cart&&(0,b.jsx)(t,{children:f.cart}),(0,b.jsx)(s,{children:(0,b.jsx)("button",{className:"btn primary",onClick:()=>{g(a)},disabled:e.cart,children:e.cart?"Adding...":"Add to Cart"})})]})]})]})}):null}],13937)},56048,a=>{"use strict";var b=a.i(54715),c=a.i(47937),d=a.i(12851),e=a.i(20898),f=a.i(33080),g=a.i(13937),h=a.i(28049);let i=h.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`,j=h.default.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
    url('https://images.unsplash.com/photo-1556228453-efd17c9d9b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
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
    
    h1 {
      font-size: 3.5rem;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-family: var(--font-playfair), 'Playfair Display', serif;
    }
    
    p {
      font-size: 1.4rem;
      max-width: 700px;
      margin: 0 auto;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      line-height: 1.7;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
`,k=h.default.div`
  display: flex;
  flex: 1;
  padding: 80px 0;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`,l=h.default.div`
  width: 300px;
  padding: 0 30px 0 60px;
  background-color: transparent;
  
  @media (max-width: 992px) {
    display: none;
  }
`,m=h.default.div`
  margin-bottom: 50px;
  padding: 25px 0;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);
`,n=h.default.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 1.3rem;
    color: #c19a6b;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
`,o=h.default.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,p=h.default.button`
  background: ${a=>a.$active?"rgba(193, 154, 107, 0.1)":"transparent"};
  color: ${a=>a.$active?"#c19a6b":"#666"};
  border: 1px solid ${a=>a.$active?"#c19a6b":"rgba(200, 200, 200, 0.5)"};
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
  border-radius: 0;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: capitalize;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${a=>a.$active?"100%":"0"};
    height: 2px;
    background: #c19a6b;
    transition: width 0.3s ease;
  }
  
  &:hover {
    background: rgba(193, 154, 107, 0.08);
    color: #c19a6b;
    border-color: #c19a6b;
    
    &::after {
      width: 100%;
    }
  }
`,q=h.default.div`
  flex: 1;
  padding: 0 30px;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`,r=h.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  justify-content: center;
  margin-bottom: 60px;
`,s=h.default.div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
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

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`,t=h.default.div`
  height: 320px;
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;

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
  
  &:hover {
    transform: scale(1.03);
  }
  
  .add-to-cart-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    flex-direction: column;
    gap: 15px;
  }

  &:hover .add-to-cart-overlay {
    opacity: 1;
  }
`,u=h.default.div`
  padding: 35px 25px;
  text-align: center;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: capitalize;
  }

  p {
    color: #666;
    margin-bottom: 15px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 15px;
    line-height: 1.7;
  }
  
  .product-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }
`,v=h.default.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #c19a6b;
  margin: 12px 0;
  font-family: var(--font-playfair), 'Playfair Display', serif;
`,w=h.default.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 50px;
`,x=h.default.button`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${a=>a.$active?"#c19a6b":"#fff"};
  color: ${a=>a.$active?"#fff":"#666"};
  border: 2px solid ${a=>a.$active?"#c19a6b":"#ddd"};
  font-size: 1.1rem;
  font-weight: ${a=>a.$active?"600":"500"};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  
  &:hover {
    background: ${a=>a.$active?"#a8825f":"#f5f5f5"};
    color: ${a=>a.$active?"#fff":"#c19a6b"};
    border-color: #c19a6b;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
    color: #999;
    border-color: #ddd;
  }
`,y=h.default.div`
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
`,z=h.default.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #721c24;
  }

  .btn {
    padding: 12px 24px;
  }
`;a.s(["default",0,()=>{let{products:a,loading:h,error:A,fetchProducts:B,addToCart:C}=(0,d.useAppContext)(),[D,E]=(0,c.useState)(null),[F,G]=(0,c.useState)({category:"All",priceRange:"All",sortBy:"name"}),[H,I]=(0,c.useState)(1),[J]=(0,c.useState)(8);(0,c.useEffect)(()=>{0!==a.length||h.products||B()},[B,a.length,h.products]);let K=a.filter(a=>"All"===F.category||a.category===F.category).sort((a,b)=>"name"===F.sortBy?a.name.localeCompare(b.name):"price-low"===F.sortBy?a.price-b.price:"price-high"===F.sortBy?b.price-a.price:0),L=H*J,M=K.slice(L-J,L),N=Math.ceil(K.length/J),O=["All",...new Set(a.map(a=>a.category).filter(Boolean))],P=(a,b)=>{G(c=>({...c,[a]:b||""})),I(1)};return h.products?(0,b.jsx)(i,{children:(0,b.jsx)(y,{})}):A.products?(0,b.jsxs)(z,{children:[(0,b.jsx)("p",{children:A.products}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>window.location.reload(),children:"Retry"})]}):(0,b.jsxs)(i,{children:[(0,b.jsx)(e.default,{activePage:"shop"}),(0,b.jsx)(j,{children:(0,b.jsxs)("div",{className:"hero-content",children:[(0,b.jsx)("h1",{children:"Elegant Collection"}),(0,b.jsx)("p",{children:"Discover our curated collection of premium interior design pieces and decor items"})]})}),(0,b.jsxs)(k,{children:[(0,b.jsxs)(l,{children:[(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:(0,b.jsx)("h3",{children:"CATEGORIES"})}),(0,b.jsx)(o,{children:O.map(a=>(0,b.jsx)(p,{$active:F.category===a,onClick:()=>P("category",a),children:a},a))})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:(0,b.jsx)("h3",{children:"PRICE RANGE"})}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{$active:"All"===F.priceRange,onClick:()=>P("priceRange","All"),children:"All Prices"}),(0,b.jsx)(p,{$active:"Under ₹5,000"===F.priceRange,onClick:()=>P("priceRange","Under ₹5,000"),children:"Under ₹5,000"}),(0,b.jsx)(p,{$active:"₹5,000 - ₹15,000"===F.priceRange,onClick:()=>P("priceRange","₹5,000 - ₹15,000"),children:"₹5,000 - ₹15,000"}),(0,b.jsx)(p,{$active:"Over ₹15,000"===F.priceRange,onClick:()=>P("priceRange","Over ₹15,000"),children:"Over ₹15,000"})]})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:(0,b.jsx)("h3",{children:"SORT BY"})}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{$active:"name"===F.sortBy,onClick:()=>P("sortBy","name"),children:"Name A-Z"}),(0,b.jsx)(p,{$active:"price-low"===F.sortBy,onClick:()=>P("sortBy","price-low"),children:"Price: Low to High"}),(0,b.jsx)(p,{$active:"price-high"===F.sortBy,onClick:()=>P("sortBy","price-high"),children:"Price: High to Low"})]})]})]}),(0,b.jsxs)(q,{children:[(0,b.jsx)("div",{className:"section-header",children:(0,b.jsx)("h2",{className:"section-title",children:"All"===F.category?"ALL PRODUCTS":F.category.toUpperCase()})}),(0,b.jsx)(r,{children:M.map(a=>(0,b.jsxs)(s,{children:[(0,b.jsx)(t,{imageClass:a.imageClass||"modern"}),(0,b.jsxs)(u,{children:[(0,b.jsx)("h3",{children:a.name}),(0,b.jsx)("p",{children:a.description}),(0,b.jsxs)(v,{children:["₹",a.price.toLocaleString()]}),(0,b.jsxs)("div",{className:"product-actions",children:[(0,b.jsx)("button",{className:"btn primary",onClick:()=>{E(a)},children:"View Details"}),(0,b.jsx)("button",{className:"btn secondary",onClick:()=>{C(a,1)},children:"Add to Cart"})]})]})]},a.id))}),N>1&&(0,b.jsxs)(w,{children:[(0,b.jsx)(x,{onClick:()=>I(a=>Math.max(a-1,1)),disabled:1===H,children:"Previous"}),[...Array(N)].map((a,c)=>(0,b.jsx)(x,{$active:H===c+1,onClick:()=>I(c+1),children:c+1})),(0,b.jsx)(x,{onClick:()=>I(a=>Math.min(a+1,N)),disabled:H===N,children:"Next"})]})]})]}),(0,b.jsx)(f.default,{}),D&&(0,b.jsx)(g.default,{product:D,onBack:()=>{E(null)}})]})}],56048)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c218580d._.js.map