package com.dashboard.service;

import com.dashboard.exception.ProductNotFound;
import com.dashboard.model.Product;

import java.util.List;

public interface ProductService {

    public Product saveProduct(Product product);

    public List<Product> getProducts();

    public Product getProductById(int productId) throws ProductNotFound;
}
