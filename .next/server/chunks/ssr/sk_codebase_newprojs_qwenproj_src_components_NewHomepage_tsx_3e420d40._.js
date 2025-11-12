module.exports=[20248,a=>{"use strict";var b=a.i(54715),c=a.i(47937),d=a.i(49984),e=a.i(12851),f=a.i(20898),g=a.i(33080);let h=()=>{let[a,d]=(0,c.useState)(0),[e,f]=(0,c.useState)(!1),g=[{url:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",title:"Modern Living Room Design"},{url:"https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",title:"Classic Elegance"},{url:"https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",title:"Coastal Retreat"},{url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",title:"Minimalist Space"}];return(0,c.useEffect)(()=>{f(!0);let a=setInterval(()=>{d(a=>a===g.length-1?0:a+1)},5e3);return()=>clearInterval(a)},[]),(0,b.jsxs)("div",{className:"slider-container",children:[(0,b.jsx)("div",{className:"slides",children:g.map((c,d)=>{let e=d===a;return(0,b.jsx)("div",{className:`slide ${e?"active":""}`,style:{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${c.url})`},children:(0,b.jsxs)("div",{className:"slide-content",children:[(0,b.jsx)("h1",{className:"hero-title",children:"Transform Your Space Into Art"}),(0,b.jsx)("p",{className:"hero-subtitle",children:"ELEVATING INTERIORS WITH TIMELESS ELEGANCE AND FUNCTIONAL DESIGN"}),(0,b.jsxs)("div",{className:"hero-buttons",children:[(0,b.jsx)("button",{className:"btn btn-primary",onClick:()=>window.location.href="/portfolio",children:"View Portfolio"}),(0,b.jsx)("button",{className:"btn btn-secondary",onClick:()=>window.location.href="/contact",children:"Book Consultation"}),(0,b.jsx)("button",{className:"btn btn-tertiary",onClick:()=>window.location.href="/shop",children:"Shop Now"})]})]})},d)})}),(0,b.jsxs)("div",{className:"slider-controls",children:[(0,b.jsx)("button",{className:"slider-arrow prev-arrow",onClick:()=>d(0===a?g.length-1:a-1),children:(0,b.jsx)("i",{className:"fas fa-chevron-left"})}),(0,b.jsx)("button",{className:"slider-arrow next-arrow",onClick:()=>d(a===g.length-1?0:a+1),children:(0,b.jsx)("i",{className:"fas fa-chevron-right"})})]}),(0,b.jsx)("div",{className:"slider-indicators",children:g.map((c,e)=>{let f=e===a;return(0,b.jsx)("button",{className:`indicator ${f?"active":""}`,onClick:()=>{d(e)},"aria-label":`Go to slide ${e+1}`},e)})})]})};var i=a.i(13937),j=a.i(28049);let k=j.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  position: relative;
  overflow-x: hidden;
`,l=j.default.section`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
    url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  position: relative;
  margin-top: 80px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(193, 154, 107, 0.15) 0%, rgba(168, 130, 95, 0.1) 100%);
    z-index: 0;
  }
  
  > div {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    padding: 0 20px;
  }

  h1 {
    font-size: 4.8rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 300;
    line-height: 1.1;
    margin-top: -40px;
  }
  
  p {
    font-size: 1.4rem;
    margin-bottom: 40px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  
  .btn {
    padding: 16px 45px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 600;
    
    &.primary {
      background: #c19a6b;
      color: white;
      border-color: #c19a6b;
      
      &:hover {
        background: transparent;
        color: white;
        border-color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
    }
    
    &.secondary {
      background: transparent;
      color: white;
      border-color: white;
      
      &:hover {
        background: #c19a6b;
        color: white;
        border-color: #c19a6b;
        transform: translateY(-3px);
      }
    }
  }
`,m=j.default.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 0 20px;
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #2c2c2c;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    line-height: 1.8;
  }
`,n=j.default.section`
  padding: 100px 0 80px;
  background: #fafafa;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  .section-footer {
    text-align: center;
    margin-top: 60px;
    
    .btn {
      padding: 16px 45px;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 2px solid #c19a6b;
      background: transparent;
      color: #c19a6b;
      cursor: pointer;
      transition: all 0.4s ease;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-weight: 600;
      
      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      }
    }
  }
`,o=j.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`,p=j.default.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`,q=j.default.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
  
  .add-to-cart-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 2;
    
    .btn {
      padding: 12px 25px;
      font-size: 0.9rem;
    }
  }
  
  &:hover .add-to-cart-overlay {
    opacity: 1;
  }
  
  ${({imageClass:a})=>a&&`
    background-image: url('/images/products/${a}.jpg');
  `}
`,r=j.default.div`
  padding: 25px;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #2c2c2c;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 400;
  }
  
  p {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
    
    .btn {
      flex: 1;
      padding: 10px;
      font-size: 0.85rem;
    }
  }
`,s=j.default.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #c19a6b;
  margin-bottom: 15px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`,t=j.default.section`
  padding: 100px 0 80px;
  background: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  .section-footer {
    text-align: center;
    margin-top: 60px;
    
    .btn {
      padding: 16px 45px;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 2px solid #c19a6b;
      background: transparent;
      color: #c19a6b;
      cursor: pointer;
      transition: all 0.4s ease;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-weight: 600;
      
      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      }
    }
  }
`,u=j.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`,v=j.default.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 300px;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: opacity 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
    
    &::before {
      opacity: 0.85;
    }
  }
  
  .project-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 1;
  }
  
  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.4s ease;
    background: rgba(193, 154, 107, 0.85);
  }
  
  &:hover .project-overlay {
    opacity: 1;
  }
  
  .project-content {
    text-align: center;
    color: white;
    max-width: 80%;
    
    h3 {
      font-size: 1.8rem;
      margin-bottom: 12px;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-weight: 400;
      letter-spacing: 1px;
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 20px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      line-height: 1.6;
    }
  }
  
  ${({className:a})=>a&&`
    &.portfolio-modern {
      background-image: url('/images/projects/modern.jpg');
    }
    &.portfolio-classic {
      background-image: url('/images/projects/classic.jpg');
    }
    &.portfolio-coastal {
      background-image: url('/images/projects/coastal.jpg');
    }
  `}
`,w=j.default.section`
  padding: 100px 0 80px;
  background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
`,x=j.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`,y=j.default.div`
  text-align: center;
  padding: 40px 30px 35px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border: none;
  position: relative;
  z-index: 1;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.02) 0%, rgba(193,154,107,0.04) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    
    &::before {
      opacity: 1;
    }
  }
`,z=j.default.div`
  font-size: 3rem;
  color: #c19a6b;
  margin-bottom: 20px;
  transition: transform 0.4s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(193, 154, 107, 0.1);
  border-radius: 50%;
  
  ${y}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: rgba(193, 154, 107, 0.15);
  }
`,A=j.default.section`
  padding: 120px 0 100px;
  background: #ffffff;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
`,B=j.default.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 35px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`,C=j.default.div`
  background: white;
  padding: 45px 35px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
  
  .rating {
    font-size: 1.3rem;
    color: #ffc107;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .testimonial-text {
    font-style: italic;
    color: #555;
    margin-bottom: 25px;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.05rem;
    position: relative;
    padding: 0 15px;
    
    &::before {
      content: open-quote;
      font-size: 3.5rem;
      color: rgba(193, 154, 107, 0.15);
      position: absolute;
      top: -20px;
      left: -10px;
      font-family: serif;
      line-height: 1;
    }
  }
  
  .customer-name {
    text-align: right;
    font-weight: 600;
    color: #222;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.1rem;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 50px;
      height: 2px;
      background: #c19a6b;
    }
  }
`,D=j.default.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  text-align: center;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 300;
    letter-spacing: 1px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 300;
    line-height: 1.8;
    opacity: 0.9;
  }
  
  .btn {
    padding: 16px 45px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 2px solid #c19a6b;
    background: transparent;
    color: #fff;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 500;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: 0.5s;
    }
    
    &:hover {
      background: #c19a6b;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      
      &::before {
        left: 100%;
      }
    }
  }
`,E=j.default.div`
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
`,F=j.default.div`
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
`;a.s(["default",0,()=>{let a=(0,d.useRouter)(),{products:j,loading:G,error:H,fetchProducts:I}=(0,e.useAppContext)(),[J,K]=(0,c.useState)(null);(0,c.useEffect)(()=>{I()},[I]);let L=b=>{a.push(b)},M=a=>{K(a)};return G.products?(0,b.jsx)(k,{children:(0,b.jsx)(E,{})}):H.products?(0,b.jsxs)(F,{children:[(0,b.jsx)("p",{children:H.products}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>window.location.reload(),children:"Retry"})]}):(0,b.jsxs)(k,{children:[(0,b.jsx)(f.default,{activePage:"home"}),(0,b.jsx)(l,{children:(0,b.jsx)(h,{})}),(0,b.jsxs)(t,{children:[(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("h2",{className:"section-title",children:"DESIGN PORTFOLIO"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Explore our curated collection of distinctive design concepts that harmoniously blend timeless elegance with contemporary innovation"})]}),(0,b.jsx)(u,{children:[{id:1,title:"Modern Minimalist",description:"Clean lines and contemporary aesthetics",imageClass:"modern"},{id:2,title:"Classic Elegance",description:"Timeless designs with refined details",imageClass:"classic"},{id:3,title:"Coastal Retreat",description:"Light, airy spaces with natural elements",imageClass:"coastal"}].map(a=>(0,b.jsxs)(v,{className:`portfolio-${a.imageClass}`,children:[(0,b.jsx)("div",{className:`project-image ${a.imageClass}`}),(0,b.jsx)("div",{className:"project-overlay",children:(0,b.jsxs)("div",{className:"project-content",children:[(0,b.jsx)("h3",{children:a.title}),(0,b.jsx)("p",{children:a.description}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>L("/portfolio"),children:"View Project"})]})})]},a.id))}),(0,b.jsx)("div",{className:"section-footer",children:(0,b.jsx)("button",{className:"btn primary",onClick:()=>L("/portfolio"),children:"View More Projects"})})]}),(0,b.jsxs)(n,{children:[(0,b.jsxs)(m,{children:[(0,b.jsx)("h2",{className:"section-title",children:"FEATURED COLLECTION"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Curated masterpieces that exemplify our commitment to quality craftsmanship and design excellence"})]}),(0,b.jsx)(o,{children:j.slice(0,6).map(a=>(0,b.jsxs)(p,{children:[(0,b.jsx)(q,{imageClass:a.imageClass,children:(0,b.jsx)("div",{className:"add-to-cart-overlay",children:(0,b.jsx)("button",{className:"btn primary",onClick:()=>M(a),children:"View Details"})})}),(0,b.jsxs)(r,{children:[(0,b.jsx)("h3",{children:a.name}),(0,b.jsx)("p",{children:a.description}),(0,b.jsxs)(s,{children:["₹",a.price.toLocaleString()]}),(0,b.jsxs)("div",{className:"product-actions",children:[(0,b.jsx)("button",{className:"btn primary",onClick:()=>M(a),children:"View Details"}),(0,b.jsx)("button",{className:"btn secondary",onClick:()=>L("/cart"),children:"Add to Cart"})]})]})]},a.id))}),(0,b.jsx)("div",{className:"section-footer",children:(0,b.jsx)("button",{className:"btn primary",onClick:()=>L("/shop"),children:"Explore Collection"})})]}),(0,b.jsxs)(w,{children:[(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("h2",{className:"section-title",children:"OUR SERVICES"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Professional design solutions tailored to transform your space into an extraordinary experience"})]}),(0,b.jsx)(x,{children:[{id:1,icon:"fas fa-pencil-ruler",title:"DESIGN CONSULTATION",description:"Comprehensive design planning and concept development"},{id:2,icon:"fas fa-couch",title:"FURNITURE DESIGN",description:"Custom furniture pieces crafted to your specifications"},{id:3,icon:"fas fa-home",title:"SPACE PLANNING",description:"Optimizing layouts for flow and functionality"},{id:4,icon:"fas fa-paint-roller",title:"COLOR CONSULTING",description:"Expert color selection for mood and ambiance"},{id:5,icon:"fas fa-lightbulb",title:"LIGHTING DESIGN",description:"Strategic lighting solutions for every space"},{id:6,icon:"fas fa-project-diagram",title:"PROJECT MANAGEMENT",description:"End-to-end oversight from concept to completion"}].map(a=>(0,b.jsxs)(y,{children:[(0,b.jsx)(z,{children:(0,b.jsx)("i",{className:a.icon})}),(0,b.jsx)("h3",{children:a.title}),(0,b.jsx)("p",{children:a.description})]},a.id))})]}),(0,b.jsxs)(A,{children:[(0,b.jsxs)("div",{className:"section-header",children:[(0,b.jsx)("h2",{className:"section-title",children:"CLIENT TESTIMONIALS"}),(0,b.jsx)("p",{className:"section-subtitle",children:"Discover what our valued clients say about their transformative experiences with our design services"})]}),(0,b.jsx)(B,{children:[{id:1,text:"Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision exceeded all our expectations. The process was seamless from start to finish!",author:"Michael & Jennifer Roberts",rating:5},{id:2,text:"Working with Elegant Spaces was a game-changer for our restaurant. The design elevated our brand and created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!",author:"David Chen, Bistro 45 Owner",rating:5},{id:3,text:"The team at Elegant Spaces understood our vision perfectly. They created a home office that inspires productivity while maintaining the warmth of our family space. Truly exceptional work!",author:"Priya Sharma, Architect",rating:5}].map(a=>(0,b.jsxs)(C,{children:[(0,b.jsx)("div",{className:"rating",children:"★".repeat(a.rating)}),(0,b.jsxs)("div",{className:"testimonial-text",children:['"',a.text,'"']}),(0,b.jsx)("div",{className:"customer-name",children:a.author})]},a.id))})]}),(0,b.jsx)(D,{children:(0,b.jsxs)("div",{className:"section-content",children:[(0,b.jsx)("h2",{children:"Ready to transform your space?"}),(0,b.jsx)("p",{children:"Schedule a complimentary 30-minute consultation to discuss your project vision."}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>L("/contact"),children:"Schedule Now"})]})}),(0,b.jsx)(g.default,{}),J&&(0,b.jsx)(i.default,{product:J,onBack:()=>{K(null)}})]})}],20248)}];

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_src_components_NewHomepage_tsx_3e420d40._.js.map