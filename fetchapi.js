async function getProducts() {
  let urlProducts = "https://northwind.vercel.app/api/products";
  try {
    let result = await fetch(urlProducts);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

async function getSuppliers() {
  let urlSupplier = `https://northwind.vercel.app/api/suppliers`;
  try {
    let response = await fetch(urlSupplier);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getCategories() {
  let urlCategory = `https://northwind.vercel.app/api/categories`;
  try {
    let res = await fetch(urlCategory);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderProducts() {
  let products = await getProducts();
  let html = "";

    let suppliers = await getSuppliers();
    let categories = await getCategories();

//   Diğer bir yöntem
//   let suppliers = await fetch("https://northwind.vercel.app/api/suppliers").then(response => response.json()).catch(error => console.log(error)));
//   let categories = await fetch("https://northwind.vercel.app/api/categories").then(response => response.json()).catch(error => console.log(error)));

  products.forEach(async (product) => {
    let supplier = suppliers.find((s) => s.id === product.supplierId);
    let category = categories.find((c) => c.id === product.categoryId);

    let color = '';
    if(product.unitsInStock<5){
        color = '#F89B9C';
    }
    else if(product.unitsInStock<10){
        color = '#FFB486';
    }
    else if(product.unitsInStock<20){
        color = '#FFF06F';
    }
    else{
        color = '#82FA91';
    }

    let htmlSegment = `<tr style="background-color:${color};">
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${supplier.companyName}</td>
    <td>${category.name}</td>
    <td>${product.unitsInStock}</td>
    <td>${product.unitPrice}</td></tr>`;
    html += htmlSegment;
  });
  let container = document.querySelector("tbody");
  container.innerHTML = html;

}

renderProducts();
