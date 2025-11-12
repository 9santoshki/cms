(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,83598,(e,s,a)=>{s.exports=e.r(63962)},42146,e=>{"use strict";var s=e.i(24431),a=e.i(33225),i=e.i(83598),n=e.i(33637),r=e.i(62433),d=e.i(44032);let t=d.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Montserrat', Arial, sans-serif;
`,c=d.default.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
  margin-bottom: 0;

  .admin-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  h1 {
    color: #222;
    margin: 0;
    font-size: 1.8rem;
  }

  .admin-header-actions {
    display: flex;
    gap: 15px;
  }

  .admin-header-actions .btn {
    margin: 0;
  }
`,l=d.default.aside`
  width: 250px;
  background-color: white;
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  z-index: 999;
  overflow-y: auto;

  .admin-nav {
    padding: 20px 0;
  }

  .admin-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .admin-nav li {
    margin: 0;
  }

  .admin-nav-link {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f8f8f8;
      color: #c19a6b;
    }

    &.active {
      background-color: #c19a6b;
      color: white;
      border-left: 4px solid #a8825f;

      i {
        color: white;
      }
    }

    i {
      margin-right: 15px;
      width: 20px;
      text-align: center;
    }
  }
`,o=d.default.main`
  flex: 1;
  margin-left: 250px;
  padding: 30px 20px;
  margin-top: 80px;

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .admin-header h2 {
    margin: 0;
    color: #222;
  }

  .admin-actions {
    display: flex;
    gap: 10px;
  }
`,h=d.default.div`
  background-color: white;
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;

  h3 {
    margin-top: 0;
    color: #222;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`,x=d.default.button`
  display: inline-block;
  padding: 12px 24px;
  background-color: #c19a6b;
  color: white;
  border: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(193, 154, 107, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  i {
    margin-right: 8px;
  }
`;d.default.div`
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-icon {
    font-size: 2rem;
    color: #c19a6b;
    margin-bottom: 15px;
  }

  .stat-content {
    h3 {
      font-size: 1.8rem;
      margin: 0 0 5px 0;
      color: #222;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .dashboard-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }

  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
`,d.default.div`
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 0;
    padding: 15px;
  }
`;let m=()=>(0,s.jsxs)("div",{className:"admin-dashboard",children:[(0,s.jsx)("h2",{children:"Dashboard Overview"}),(0,s.jsxs)("div",{className:"dashboard-stats",children:[(0,s.jsxs)(h,{children:[(0,s.jsx)("div",{className:"stat-icon",children:(0,s.jsx)("i",{className:"fas fa-shopping-cart"})}),(0,s.jsxs)("div",{className:"stat-content",children:[(0,s.jsx)("h3",{children:"128"}),(0,s.jsx)("p",{children:"Total Orders"})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("div",{className:"stat-icon",children:(0,s.jsx)("i",{className:"fas fa-box"})}),(0,s.jsxs)("div",{className:"stat-content",children:[(0,s.jsx)("h3",{children:"42"}),(0,s.jsx)("p",{children:"Products"})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("div",{className:"stat-icon",children:(0,s.jsx)("i",{className:"fas fa-users"})}),(0,s.jsxs)("div",{className:"stat-content",children:[(0,s.jsx)("h3",{children:"89"}),(0,s.jsx)("p",{children:"Customers"})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("div",{className:"stat-icon",children:(0,s.jsx)("i",{className:"fas fa-receipt"})}),(0,s.jsxs)("div",{className:"stat-content",children:[(0,s.jsx)("h3",{children:"₹42,350"}),(0,s.jsx)("p",{children:"Total Revenue"})]})]})]}),(0,s.jsxs)("div",{className:"dashboard-content",children:[(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Recent Orders"}),(0,s.jsx)("p",{children:"Latest orders from your store"})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Quick Actions"}),(0,s.jsxs)("div",{className:"quick-actions",children:[(0,s.jsxs)(x,{onClick:()=>window.location.hash="#add-product",children:[(0,s.jsx)("i",{className:"fas fa-plus"})," Add Product"]}),(0,s.jsxs)(x,{onClick:()=>window.location.hash="#manage-content",children:[(0,s.jsx)("i",{className:"fas fa-edit"})," Manage Content"]}),(0,s.jsxs)(x,{onClick:()=>window.location.hash="#view-orders",children:[(0,s.jsx)("i",{className:"fas fa-list"})," View Orders"]})]})]})]})]}),p=()=>{let{products:e,fetchProducts:i,loading:r,error:d}=(0,n.useAppContext)(),[t,c]=(0,a.useState)(!1),[l,o]=(0,a.useState)(null),[m,p]=(0,a.useState)({name:"",description:"",price:"",category:"",imageClass:"modern"});(0,a.useEffect)(()=>{i()},[i]);let u=e=>{let{name:s,value:a}=e.target;p(e=>({...e,[s]:a}))};return r.products?(0,s.jsxs)("div",{className:"admin-loading",children:[(0,s.jsx)("div",{className:"loading-spinner"}),(0,s.jsx)("p",{children:"Loading products..."})]}):d.products?(0,s.jsxs)("div",{className:"admin-error",children:[(0,s.jsxs)("p",{children:["Error loading products: ",d.products]}),(0,s.jsx)("button",{className:"btn primary",onClick:i,children:"Retry"})]}):(0,s.jsxs)("div",{className:"admin-products",children:[(0,s.jsxs)("div",{className:"admin-header",children:[(0,s.jsx)("h2",{children:"Product Management"}),(0,s.jsx)("div",{className:"admin-actions",children:(0,s.jsxs)(x,{onClick:()=>c(!0),children:[(0,s.jsx)("i",{className:"fas fa-plus"})," Add Product"]})})]}),t&&(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:l?"Edit Product":"Add New Product"}),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault(),l?(console.log("Updating product:",{...l,...m}),o(null)):console.log("Adding new product:",m),p({name:"",description:"",price:"",category:"",imageClass:"modern"}),c(!1)},className:"admin-form",children:[(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"productName",children:"Product Name"}),(0,s.jsx)("input",{type:"text",id:"productName",name:"name",value:m.name,onChange:u,placeholder:"Enter product name",required:!0})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"productDescription",children:"Description"}),(0,s.jsx)("textarea",{id:"productDescription",name:"description",value:m.description,onChange:u,placeholder:"Enter product description",required:!0,rows:4})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"productPrice",children:"Price (₹)"}),(0,s.jsx)("input",{type:"number",id:"productPrice",name:"price",value:m.price,onChange:u,placeholder:"Enter price",required:!0,min:"0",step:"0.01"})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"productCategory",children:"Category"}),(0,s.jsx)("input",{type:"text",id:"productCategory",name:"category",value:m.category,onChange:u,placeholder:"Enter category"})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"productImageClass",children:"Image Class"}),(0,s.jsxs)("select",{id:"productImageClass",name:"imageClass",value:m.imageClass,onChange:u,children:[(0,s.jsx)("option",{value:"modern",children:"Modern"}),(0,s.jsx)("option",{value:"classic",children:"Classic"}),(0,s.jsx)("option",{value:"coastal",children:"Coastal"}),(0,s.jsx)("option",{value:"office",children:"Office"}),(0,s.jsx)("option",{value:"hotel",children:"Hotel"}),(0,s.jsx)("option",{value:"restaurant",children:"Restaurant"})]})]}),(0,s.jsxs)("div",{className:"form-actions",children:[(0,s.jsx)(x,{type:"button",onClick:()=>c(!1),children:"Cancel"}),(0,s.jsx)(x,{type:"submit",children:l?"Update Product":"Add Product"})]})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Existing Products"}),(0,s.jsx)("div",{className:"table-responsive",children:(0,s.jsxs)("table",{className:"admin-table",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"ID"}),(0,s.jsx)("th",{children:"Name"}),(0,s.jsx)("th",{children:"Price"}),(0,s.jsx)("th",{children:"Category"}),(0,s.jsx)("th",{children:"Stock Status"}),(0,s.jsx)("th",{children:"Actions"})]})}),(0,s.jsx)("tbody",{children:e.map(e=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:e.id}),(0,s.jsx)("td",{children:e.name}),(0,s.jsxs)("td",{children:["₹",e.price.toLocaleString()]}),(0,s.jsx)("td",{children:e.category||"N/A"}),(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:`status-badge ${e.in_stock?"in-stock":"out-of-stock"}`,children:e.in_stock?"In Stock":"Out of Stock"})}),(0,s.jsx)("td",{children:(0,s.jsxs)("div",{className:"table-actions",children:[(0,s.jsxs)("button",{className:"btn secondary",onClick:()=>{o(e),p({name:e.name||"",description:e.description||"",price:e.price?.toString()||"",category:e.category||"",imageClass:e.imageClass||"modern"}),c(!0)},style:{marginRight:"10px"},children:[(0,s.jsx)("i",{className:"fas fa-edit"})," Edit"]}),(0,s.jsxs)("button",{className:"btn danger",onClick:()=>{var s;return s=e.id,void(window.confirm("Are you sure you want to delete this product?")&&console.log("Deleting product:",s))},children:[(0,s.jsx)("i",{className:"fas fa-trash"})," Delete"]})]})})]},e.id))})]})})]})]})},u=()=>(0,s.jsxs)("div",{className:"admin-orders",children:[(0,s.jsxs)("div",{className:"admin-header",children:[(0,s.jsx)("h2",{children:"Order Management"}),(0,s.jsx)("div",{className:"admin-actions",children:(0,s.jsxs)(x,{children:[(0,s.jsx)("i",{className:"fas fa-sync"})," Refresh"]})})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Manage Orders"}),(0,s.jsx)("p",{children:"View and manage customer orders here."})]})]}),j=()=>(0,s.jsxs)("div",{className:"admin-users",children:[(0,s.jsxs)("div",{className:"admin-header",children:[(0,s.jsx)("h2",{children:"User Management"}),(0,s.jsx)("div",{className:"admin-actions",children:(0,s.jsxs)(x,{children:[(0,s.jsx)("i",{className:"fas fa-plus"})," Add User"]})})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Manage Users"}),(0,s.jsx)("p",{children:"View and manage user accounts here."})]})]}),g=()=>(0,s.jsxs)("div",{className:"admin-content",children:[(0,s.jsxs)("div",{className:"admin-header",children:[(0,s.jsx)("h2",{children:"Content Management"}),(0,s.jsx)("div",{className:"admin-actions",children:(0,s.jsxs)(x,{children:[(0,s.jsx)("i",{className:"fas fa-plus"})," Add Content"]})})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Edit Content"}),(0,s.jsx)("p",{children:"Modify site content, images, and text here."})]})]}),f=()=>(0,s.jsxs)("div",{className:"admin-settings",children:[(0,s.jsxs)("div",{className:"admin-header",children:[(0,s.jsx)("h2",{children:"Settings"}),(0,s.jsx)("div",{className:"admin-actions",children:(0,s.jsxs)(x,{children:[(0,s.jsx)("i",{className:"fas fa-save"})," Save"]})})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)("h3",{children:"Site Settings"}),(0,s.jsx)("p",{children:"Configure site-wide settings and preferences."})]})]});e.s(["default",0,()=>{let e=(0,i.useRouter)(),d=s=>{e.push(s)},{user:h,logout:x}=(0,n.useAppContext)(),[b,v]=(0,a.useState)("dashboard");return(0,a.useEffect)(()=>{h?h.role&&"admin"===h.role||(d("/"),alert("Access denied: Admin privileges required")):d("/auth")},[h,d]),(0,s.jsxs)(t,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(r.default,{activePage:"admin"}),(0,s.jsxs)("div",{className:"admin-header-content",children:[(0,s.jsx)("h1",{children:"Admin Dashboard"}),(0,s.jsxs)("div",{className:"admin-header-actions",children:[(0,s.jsx)("button",{className:"btn secondary",onClick:()=>d("/"),children:"Visit Site"}),(0,s.jsx)("button",{className:"btn primary",onClick:()=>{x(),d("/")},children:"Logout"})]})]})]}),(0,s.jsxs)("div",{className:"admin-layout",children:[(0,s.jsx)(l,{children:(0,s.jsx)("nav",{className:"admin-nav",children:(0,s.jsx)("ul",{children:[{id:"dashboard",label:"Dashboard",icon:"fas fa-tachometer-alt"},{id:"products",label:"Products",icon:"fas fa-box"},{id:"orders",label:"Orders",icon:"fas fa-shopping-cart"},{id:"users",label:"Users",icon:"fas fa-users"},{id:"content",label:"Content",icon:"fas fa-edit"},{id:"settings",label:"Settings",icon:"fas fa-cog"}].map(e=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{className:`admin-nav-link ${b===e.id?"active":""}`,onClick:()=>v(e.id),children:[(0,s.jsx)("i",{className:e.icon}),e.label]})},e.id))})})}),(0,s.jsx)(o,{children:(()=>{switch(b){case"dashboard":default:return(0,s.jsx)(m,{});case"products":return(0,s.jsx)(p,{});case"orders":return(0,s.jsx)(u,{});case"users":return(0,s.jsx)(j,{});case"content":return(0,s.jsx)(g,{});case"settings":return(0,s.jsx)(f,{})}})()})]})]})}],42146)}]);