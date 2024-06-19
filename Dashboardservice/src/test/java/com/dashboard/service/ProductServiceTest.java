package com.dashboard.service;

import com.dashboard.exception.ProductNotFound;
import com.dashboard.model.Product;
import com.dashboard.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;


    @BeforeEach
    void setUp() {
        Optional<Product> product = Optional.ofNullable(Product.builder()
                .productId(1)
                .productName("Iphone 15")
                .productDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam. Vivamus luctus sodales facilisis.")
                .productFamily("Phone").build());

        Product inputProduct = Product.builder()
                .productName("Iphone 15")
                .productDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.")
                .productFamily("Phone")
                .build();

        Product product1 =new Product(1, "Iphone 15","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product2 =new Product(2, "Iphone 15 plus","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product3 =new Product(3, "Iphone 15 pro","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product4 =new Product(4, "Iphone 15 pro max","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");

        List<Product> products = new ArrayList<>(Arrays.asList(product1, product2, product3, product4));

        Mockito.when(productRepository.findById(1)).thenReturn(product);
        Mockito.when(productRepository.findAll()).thenReturn(products);
        Mockito.when(productRepository.save(inputProduct)).thenReturn(product1);
    }

    @Test
    @DisplayName("Saving the product details!!")
    void testingSaveProduct(){
        Product inputProduct = Product.builder()
                .productName("Iphone 15")
                .productDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.")
                .productFamily("Phone")
                .build();
        Product product = productService.saveProduct(inputProduct);
        assertEquals(1, product.getProductId());
    }

    @Test
    @DisplayName("Getting list of products!!")
    void testingGetProducts() {
        List<Product> actualProducts = productService.getProducts();
        assertEquals(4,actualProducts.size());
    }

    @Test
    @DisplayName("Getting a single product by using product id!!")
    void testingGetProductById() throws ProductNotFound {
        Product found = productService.getProductById(1);
        assertEquals("Iphone 15", found.getProductName());
    }

    @Test
    @DisplayName("productNotFound exception is thrown when empty product is returned!!")
    void testingEmptyProductException() {
        assertThrows(ProductNotFound.class,
                ()-> productService.getProductById(2));
    }
}