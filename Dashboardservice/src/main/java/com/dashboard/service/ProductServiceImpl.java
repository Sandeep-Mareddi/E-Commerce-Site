package com.dashboard.service;

import com.dashboard.exception.ProductNotFound;
import com.dashboard.model.Product;
import com.dashboard.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
   }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(int productId) throws ProductNotFound {
        Optional<Product> product =productRepository.findById(productId);
        if(product.isEmpty()){
            throw new ProductNotFound("Product not available.");
        }
        return product.get();
    }
}
