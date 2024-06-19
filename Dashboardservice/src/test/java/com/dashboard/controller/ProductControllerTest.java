package com.dashboard.controller;

import com.dashboard.exception.ProductNotFound;
import com.dashboard.model.Product;
import com.dashboard.service.ProductService;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    String token;

    Product product;

    @BeforeEach
    void setUp() throws Exception {
        ResultActions resultActions = this.mockMvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON).content("""
                {
                    "username" : "krishna1",
                    "password" : "krishna1"
                }"""));
        MvcResult mvcResult = resultActions.andDo(print()).andReturn();
        String contentAsString = mvcResult.getResponse().getContentAsString();
        JSONObject json = new JSONObject(contentAsString);
        this.token = "Bearer " + json.getString("jwtToken");

         product = Product.builder()
                .productId(1)
                .productName("Iphone")
                .productFamily("phone")
                .productDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis.")
                .build();

        Product product1 =new Product(1, "Iphone 15","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product2 =new Product(2, "Iphone 15 plus","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product3 =new Product(3, "Iphone 15 pro","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");
        Product product4 =new Product(4, "Iphone 15 pro max","Phone" ,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis. Etiam a tellus venenatis, elementum lorem in, gravida diam.");

        List<Product> products = Arrays.asList(product1, product2, product3, product4);
        Mockito.when(productService.getProducts()).thenReturn(products);
    }

    @Test
    @DisplayName("saving the product by taking product details")
    void testingSaveProductInfo() throws Exception {
        Product inputProduct = Product.builder()
                .productName("Iphone")
                .productFamily("phone")
                .productDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis.")
                .build();
        Mockito.when(productService.saveProduct(inputProduct)).thenReturn(product);

        mockMvc.perform(post("/dashboard/save").contentType(MediaType.APPLICATION_JSON).header("Authorization", this.token)
                .content("""
                        {
                            "productName": "Iphone",
                            "productFamily": "phone",
                            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis magna sed magna aliquam facilisis."
                        }""")).andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value("Iphone"));
    }

    @Test
    @DisplayName("Getting list of all products")
    void testingGetAllProducts() throws Exception {
        mockMvc.perform(get("/dashboard/products").contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", this.token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productName").value("Iphone 15"));
    }

    @Test
    @DisplayName("Getting a single product by using product Id!!")
    void testingGetProduct() throws Exception {
        Mockito.when(productService.getProductById(1)).thenReturn(product);
        mockMvc.perform(get("/dashboard/product/1")
                .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization",this.token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value(product.getProductName()));
    }

    @Test
    @DisplayName("Checking when product not available.")
    void testingProductNotFound() throws Exception {
        Mockito.when(productService.getProductById(1)).thenThrow(ProductNotFound.class);
        mockMvc.perform(get("/dashboard/product/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization",this.token))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.httpStatus").value("NOT_FOUND"));
    }

    @Test
    @DisplayName("Checking when Unauthorized user try to get product details!!")
    void testingUnauthorizedUserTryToGetProductDetails() throws Exception {
        Mockito.when(productService.getProductById(1)).thenReturn(product);
        mockMvc.perform(get("/dashboard/product/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}