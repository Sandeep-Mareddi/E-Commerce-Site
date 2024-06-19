package com.dashboard.controller;


import com.dashboard.exception.ProductNotFound;
import com.dashboard.model.Product;
import com.dashboard.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dashboard")
@Tag(name = "ProductController", description = "APIs to do CRUD operation on product.")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private ProductService productService;
    @Operation(summary = "Save product!!", description = "This API is used for adding the product details into the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success | OK"),
            @ApiResponse(responseCode = "201", description = "new user created"),
            @ApiResponse(responseCode = "406", description = "Enter valid details")
    })
    @PostMapping("/save")
    public Product saveProductInfo(@Valid @RequestBody Product product){
        Product product1 = productService.saveProduct(product);
        logger.info("Product successfully Saved into the database!!");
        return product1;
    }

    @Operation(summary = "Get all products!!", description = "This API is used to get all the product details from the DB ")
    @GetMapping("/products")
    public List<Product> getAllProducts(){

        List<Product> products = productService.getProducts();
        logger.info("list of products successfully fetched!!");
        return products;
    }

    @Operation(summary = "Get single product!!", description = "This API is used to get a single product by using it's product id from the DB")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success | Ok"),
            @ApiResponse(responseCode = "404", description = "product not found!!")
    })
    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable int id) throws ProductNotFound {
        Product productById = productService.getProductById(id);
        logger.info("successfully fetched a single product by using id");
        return productById;
    }
}
