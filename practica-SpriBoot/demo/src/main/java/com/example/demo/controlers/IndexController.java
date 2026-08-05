package com.example.demo.controlers;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController{
        @GetMapping("/")
        public String index(Model model){
            model.addAttribute("nombre","Gabriel Arturo");
            model.addAttribute("Ingredentes", List.of("Carne","Pollo","Pescado","Vegetales"));
            return "index";
        
    }
}
