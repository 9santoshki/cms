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
`;a.s(["default",0,({product:a,onBack:d})=>{let{loading:e,error:f,addToCart:g}=(0,c.useAppContext)();return a?(0,b.jsx)(j,{children:(0,b.jsxs)(k,{children:[(0,b.jsx)(l,{onClick:d,children:(0,b.jsx)("i",{className:"fas fa-times"})}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{imageClass:a.imageClass}),(0,b.jsxs)(o,{children:[(0,b.jsx)(p,{children:a.name}),(0,b.jsxs)(q,{children:["₹",a.price.toLocaleString()]}),(0,b.jsx)(r,{children:a.description}),f.cart&&(0,b.jsx)(t,{children:f.cart}),(0,b.jsx)(s,{children:(0,b.jsx)("button",{className:"btn primary",onClick:()=>{g(a)},disabled:e.cart,children:e.cart?"Adding...":"Add to Cart"})})]})]})]})}):null}],13937)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__6004f31b._.js.map