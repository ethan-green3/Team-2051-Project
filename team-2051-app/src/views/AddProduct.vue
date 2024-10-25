<template>
    <div class="add-product-page">
      <h1>Add product</h1>
      <form class="add-product-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name*</label>
            <input type="text" id="name" placeholder="Enter product name" />
          </div>
          <div class="form-group">
            <label for="item-code">Item code*</label>
            <input type="text" id="item-code" placeholder="Enter item code" />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter product description"></textarea>
          </div>
          <div class="form-group">
            <label for="stock-size">Stock size*</label>
            <input type="number" id="stock-size" placeholder="Enter stock size" />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="category">Category*</label>
            <input type="text" id="category" placeholder="Enter category" />
          </div>
          <div class="form-group">
            <label for="store-availability">Store availability*</label>
            <select id="store-availability">
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="price">Price*</label>
            <input type="text" id="price" placeholder="Enter price" />
          </div>
          <div class="form-group">
            <label for="product-photos">Product photos*</label>
            <input type="file" id="product-photos" multiple />
          </div>
        </div>
  
        <button type="submit" class="submit-button">Save product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddProduct',
  };
  </script>
  
  <style scoped>
  .add-product-page {
    padding: 20px;
  }
  
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .add-product-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input, textarea, select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
  }
  
  textarea {
    resize: vertical;
  }
  
  .submit-button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #5e2aa0;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .submit-button:hover {
    background-color: #4b1b8b;
  }
  </style>
  