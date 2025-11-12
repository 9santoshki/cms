module.exports=[30410,a=>{"use strict";var b=a.i(54715),c=a.i(47937),d=a.i(49984),e=a.i(12851),f=a.i(20898),g=a.i(28049);let h=g.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Montserrat', Arial, sans-serif;
`,i=g.default.header`
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
`,j=g.default.aside`
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
`,k=g.default.main`
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
`,l=g.default.div`
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
`,m=g.default.button`
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
`;g.default.div`
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
`,g.default.div`
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
`;let n=()=>(0,b.jsxs)("div",{className:"admin-dashboard",children:[(0,b.jsx)("h2",{children:"Dashboard Overview"}),(0,b.jsxs)("div",{className:"dashboard-stats",children:[(0,b.jsxs)(l,{children:[(0,b.jsx)("div",{className:"stat-icon",children:(0,b.jsx)("i",{className:"fas fa-shopping-cart"})}),(0,b.jsxs)("div",{className:"stat-content",children:[(0,b.jsx)("h3",{children:"128"}),(0,b.jsx)("p",{children:"Total Orders"})]})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("div",{className:"stat-icon",children:(0,b.jsx)("i",{className:"fas fa-box"})}),(0,b.jsxs)("div",{className:"stat-content",children:[(0,b.jsx)("h3",{children:"42"}),(0,b.jsx)("p",{children:"Products"})]})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("div",{className:"stat-icon",children:(0,b.jsx)("i",{className:"fas fa-users"})}),(0,b.jsxs)("div",{className:"stat-content",children:[(0,b.jsx)("h3",{children:"89"}),(0,b.jsx)("p",{children:"Customers"})]})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("div",{className:"stat-icon",children:(0,b.jsx)("i",{className:"fas fa-receipt"})}),(0,b.jsxs)("div",{className:"stat-content",children:[(0,b.jsx)("h3",{children:"₹42,350"}),(0,b.jsx)("p",{children:"Total Revenue"})]})]})]}),(0,b.jsxs)("div",{className:"dashboard-content",children:[(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Recent Orders"}),(0,b.jsx)("p",{children:"Latest orders from your store"})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Quick Actions"}),(0,b.jsxs)("div",{className:"quick-actions",children:[(0,b.jsxs)(m,{onClick:()=>window.location.hash="#add-product",children:[(0,b.jsx)("i",{className:"fas fa-plus"})," Add Product"]}),(0,b.jsxs)(m,{onClick:()=>window.location.hash="#manage-content",children:[(0,b.jsx)("i",{className:"fas fa-edit"})," Manage Content"]}),(0,b.jsxs)(m,{onClick:()=>window.location.hash="#view-orders",children:[(0,b.jsx)("i",{className:"fas fa-list"})," View Orders"]})]})]})]})]}),o=()=>{let{products:a,fetchProducts:d,loading:f,error:g}=(0,e.useAppContext)(),[h,i]=(0,c.useState)(!1),[j,k]=(0,c.useState)(null),[n,o]=(0,c.useState)({name:"",description:"",price:"",category:"",imageClass:"modern"});(0,c.useEffect)(()=>{d()},[d]);let p=a=>{let{name:b,value:c}=a.target;o(a=>({...a,[b]:c}))};return f.products?(0,b.jsxs)("div",{className:"admin-loading",children:[(0,b.jsx)("div",{className:"loading-spinner"}),(0,b.jsx)("p",{children:"Loading products..."})]}):g.products?(0,b.jsxs)("div",{className:"admin-error",children:[(0,b.jsxs)("p",{children:["Error loading products: ",g.products]}),(0,b.jsx)("button",{className:"btn primary",onClick:d,children:"Retry"})]}):(0,b.jsxs)("div",{className:"admin-products",children:[(0,b.jsxs)("div",{className:"admin-header",children:[(0,b.jsx)("h2",{children:"Product Management"}),(0,b.jsx)("div",{className:"admin-actions",children:(0,b.jsxs)(m,{onClick:()=>i(!0),children:[(0,b.jsx)("i",{className:"fas fa-plus"})," Add Product"]})})]}),h&&(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:j?"Edit Product":"Add New Product"}),(0,b.jsxs)("form",{onSubmit:a=>{a.preventDefault(),j?(console.log("Updating product:",{...j,...n}),k(null)):console.log("Adding new product:",n),o({name:"",description:"",price:"",category:"",imageClass:"modern"}),i(!1)},className:"admin-form",children:[(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{htmlFor:"productName",children:"Product Name"}),(0,b.jsx)("input",{type:"text",id:"productName",name:"name",value:n.name,onChange:p,placeholder:"Enter product name",required:!0})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{htmlFor:"productDescription",children:"Description"}),(0,b.jsx)("textarea",{id:"productDescription",name:"description",value:n.description,onChange:p,placeholder:"Enter product description",required:!0,rows:4})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{htmlFor:"productPrice",children:"Price (₹)"}),(0,b.jsx)("input",{type:"number",id:"productPrice",name:"price",value:n.price,onChange:p,placeholder:"Enter price",required:!0,min:"0",step:"0.01"})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{htmlFor:"productCategory",children:"Category"}),(0,b.jsx)("input",{type:"text",id:"productCategory",name:"category",value:n.category,onChange:p,placeholder:"Enter category"})]}),(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{htmlFor:"productImageClass",children:"Image Class"}),(0,b.jsxs)("select",{id:"productImageClass",name:"imageClass",value:n.imageClass,onChange:p,children:[(0,b.jsx)("option",{value:"modern",children:"Modern"}),(0,b.jsx)("option",{value:"classic",children:"Classic"}),(0,b.jsx)("option",{value:"coastal",children:"Coastal"}),(0,b.jsx)("option",{value:"office",children:"Office"}),(0,b.jsx)("option",{value:"hotel",children:"Hotel"}),(0,b.jsx)("option",{value:"restaurant",children:"Restaurant"})]})]}),(0,b.jsxs)("div",{className:"form-actions",children:[(0,b.jsx)(m,{type:"button",onClick:()=>i(!1),children:"Cancel"}),(0,b.jsx)(m,{type:"submit",children:j?"Update Product":"Add Product"})]})]})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Existing Products"}),(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"admin-table",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"ID"}),(0,b.jsx)("th",{children:"Name"}),(0,b.jsx)("th",{children:"Price"}),(0,b.jsx)("th",{children:"Category"}),(0,b.jsx)("th",{children:"Stock Status"}),(0,b.jsx)("th",{children:"Actions"})]})}),(0,b.jsx)("tbody",{children:a.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:a.id}),(0,b.jsx)("td",{children:a.name}),(0,b.jsxs)("td",{children:["₹",a.price.toLocaleString()]}),(0,b.jsx)("td",{children:a.category||"N/A"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:`status-badge ${a.in_stock?"in-stock":"out-of-stock"}`,children:a.in_stock?"In Stock":"Out of Stock"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"table-actions",children:[(0,b.jsxs)("button",{className:"btn secondary",onClick:()=>{k(a),o({name:a.name||"",description:a.description||"",price:a.price?.toString()||"",category:a.category||"",imageClass:a.imageClass||"modern"}),i(!0)},style:{marginRight:"10px"},children:[(0,b.jsx)("i",{className:"fas fa-edit"})," Edit"]}),(0,b.jsxs)("button",{className:"btn danger",onClick:()=>{var b;return b=a.id,void(window.confirm("Are you sure you want to delete this product?")&&console.log("Deleting product:",b))},children:[(0,b.jsx)("i",{className:"fas fa-trash"})," Delete"]})]})})]},a.id))})]})})]})]})},p=()=>(0,b.jsxs)("div",{className:"admin-orders",children:[(0,b.jsxs)("div",{className:"admin-header",children:[(0,b.jsx)("h2",{children:"Order Management"}),(0,b.jsx)("div",{className:"admin-actions",children:(0,b.jsxs)(m,{children:[(0,b.jsx)("i",{className:"fas fa-sync"})," Refresh"]})})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Manage Orders"}),(0,b.jsx)("p",{children:"View and manage customer orders here."})]})]}),q=()=>(0,b.jsxs)("div",{className:"admin-users",children:[(0,b.jsxs)("div",{className:"admin-header",children:[(0,b.jsx)("h2",{children:"User Management"}),(0,b.jsx)("div",{className:"admin-actions",children:(0,b.jsxs)(m,{children:[(0,b.jsx)("i",{className:"fas fa-plus"})," Add User"]})})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Manage Users"}),(0,b.jsx)("p",{children:"View and manage user accounts here."})]})]}),r=()=>(0,b.jsxs)("div",{className:"admin-content",children:[(0,b.jsxs)("div",{className:"admin-header",children:[(0,b.jsx)("h2",{children:"Content Management"}),(0,b.jsx)("div",{className:"admin-actions",children:(0,b.jsxs)(m,{children:[(0,b.jsx)("i",{className:"fas fa-plus"})," Add Content"]})})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Edit Content"}),(0,b.jsx)("p",{children:"Modify site content, images, and text here."})]})]}),s=()=>(0,b.jsxs)("div",{className:"admin-settings",children:[(0,b.jsxs)("div",{className:"admin-header",children:[(0,b.jsx)("h2",{children:"Settings"}),(0,b.jsx)("div",{className:"admin-actions",children:(0,b.jsxs)(m,{children:[(0,b.jsx)("i",{className:"fas fa-save"})," Save"]})})]}),(0,b.jsxs)(l,{children:[(0,b.jsx)("h3",{children:"Site Settings"}),(0,b.jsx)("p",{children:"Configure site-wide settings and preferences."})]})]});a.s(["default",0,()=>{let a=(0,d.useRouter)(),g=b=>{a.push(b)},{user:l,logout:m}=(0,e.useAppContext)(),[t,u]=(0,c.useState)("dashboard");return(0,c.useEffect)(()=>{l?l.role&&"admin"===l.role||(g("/"),alert("Access denied: Admin privileges required")):g("/auth")},[l,g]),(0,b.jsxs)(h,{children:[(0,b.jsxs)(i,{children:[(0,b.jsx)(f.default,{activePage:"admin"}),(0,b.jsxs)("div",{className:"admin-header-content",children:[(0,b.jsx)("h1",{children:"Admin Dashboard"}),(0,b.jsxs)("div",{className:"admin-header-actions",children:[(0,b.jsx)("button",{className:"btn secondary",onClick:()=>g("/"),children:"Visit Site"}),(0,b.jsx)("button",{className:"btn primary",onClick:()=>{m(),g("/")},children:"Logout"})]})]})]}),(0,b.jsxs)("div",{className:"admin-layout",children:[(0,b.jsx)(j,{children:(0,b.jsx)("nav",{className:"admin-nav",children:(0,b.jsx)("ul",{children:[{id:"dashboard",label:"Dashboard",icon:"fas fa-tachometer-alt"},{id:"products",label:"Products",icon:"fas fa-box"},{id:"orders",label:"Orders",icon:"fas fa-shopping-cart"},{id:"users",label:"Users",icon:"fas fa-users"},{id:"content",label:"Content",icon:"fas fa-edit"},{id:"settings",label:"Settings",icon:"fas fa-cog"}].map(a=>(0,b.jsx)("li",{children:(0,b.jsxs)("button",{className:`admin-nav-link ${t===a.id?"active":""}`,onClick:()=>u(a.id),children:[(0,b.jsx)("i",{className:a.icon}),a.label]})},a.id))})})}),(0,b.jsx)(k,{children:(()=>{switch(t){case"dashboard":default:return(0,b.jsx)(n,{});case"products":return(0,b.jsx)(o,{});case"orders":return(0,b.jsx)(p,{});case"users":return(0,b.jsx)(q,{});case"content":return(0,b.jsx)(r,{});case"settings":return(0,b.jsx)(s,{})}})()})]})]})}],30410)}];

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_src_components_AdminDashboard_tsx_b94d4bb7._.js.map