package com.exampleProject.exampleProject.Controllers;

import com.exampleProject.exampleProject.models.User;
import com.exampleProject.exampleProject.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserControllers {

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @Autowired
    private UserServices userServices;

    @GetMapping
    public ResponseEntity<?> getAllUsersController(){
        try{
            List<User> listOFEmployees = userServices.getAllUsers();
            return ResponseEntity.status(HttpStatus.OK).body(listOFEmployees);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to get the employees list"+e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        try{
            User employee = userServices.getUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(employee);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> getEmployeeBySearchQuery(@PathVariable String keyword){
        try{
            List<User> employees = userServices.getUsersByNameIdOrDesig(keyword);
            return ResponseEntity.status(HttpStatus.OK).body(employees);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @PostMapping
    public User saveNewUserController(@RequestBody User user){
        return userServices.createNewUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable("id") Long id){
        try{

            User us = userServices.updateUserById(id, user);
            return ResponseEntity.status(HttpStatus.OK).body(us);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        try{

            userServices.deleteUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted thee employee:");
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Inetrnal server error");
        }
    }
}
