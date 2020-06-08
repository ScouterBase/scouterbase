package com.github.scouterbase.scouterbase.infrastructure;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping({"/calendar"})
public class AngularRoutesController {

  @GetMapping()
  public String redirectToIndex(){
    return "forward:/index.html";
  }

}
