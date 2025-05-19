package com.exampleProject.exampleProject.services;

import com.exampleProject.exampleProject.Repository.UserRepository;
import com.exampleProject.exampleProject.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    public User createNewUser(User user){
        try{
            User newUser = userRepository.save(user);
            return newUser;
        }catch(RuntimeException e){
            throw new RuntimeException("Some error occurred :"+e.getMessage());
        }
    }

    public List<User> getAllUsers(){
        try{
            List<User> UserList = userRepository.findAll();
            return UserList;
        }catch (RuntimeException e){
            throw new RuntimeException("Some error  occurred :"+e.getMessage());
        }
    }

    public User getUserById(Long id){
        try{
            Optional<User> user = userRepository.findById(id);
            if(user.isPresent()){
                return user.get();
            }else{
                throw new RuntimeException("User not found");
            }
        }catch(RuntimeException e){
            throw new RuntimeException("Somme error occurred :"+e.getMessage());
        }
    }

    public List<User> getUsersByNameIdOrDesig(String keyword){
        try{
            List<User> requiredList = userRepository.searchByKeyword(keyword);
            return requiredList;
        }catch(RuntimeException e){
            throw new RuntimeException("Some error occured :"+e.getMessage());
        }
    }

    public User updateUserById(Long id, User updatedUser){
        try{
            User existingUser  = getUserById(id);
            if(updatedUser.getName() != null){
                existingUser.setName(updatedUser.getName());
            }
            if(updatedUser.getDesignation() != null){
                existingUser.setDesignation(updatedUser.getDesignation());
            }
            if(updatedUser.getSalary() != null){
                existingUser.setSalary(updatedUser.getSalary());
            }
            if(updatedUser.getDob() != null){
                existingUser.setDob(updatedUser.getDob());
            }
            if(updatedUser.getDoj() != null){
                existingUser.setDoj(updatedUser.getDoj());
            }
            if(updatedUser.getMobile() != null){
                existingUser.setMobile(updatedUser.getMobile());
            }
            if(updatedUser.getAddress() != null){
                existingUser.setAddress(updatedUser.getAddress());
            }
            if(updatedUser.getAge() != 0){
                existingUser.setAge(updatedUser.getAge());
            }
            if(updatedUser.getCity() != null){
                existingUser.setCity(updatedUser.getCity());
            }
            if(updatedUser.getState() != null){
                existingUser.setState(updatedUser.getState());
            }
            if(updatedUser.getCountry() != null){
                existingUser.setCountry(updatedUser.getCountry());
            }

            return userRepository.save(existingUser);

        }catch(RuntimeException e){
            throw new RuntimeException("Error in updating the User: "+e.getMessage());
        }
    }

    public void deleteUserById(Long id){
        try{
            getUserById(id);
            userRepository.deleteById(id);
        }catch(RuntimeException e){
            throw new RuntimeException("Error in deleting the User : "+e.getMessage());
        }
    }



}
