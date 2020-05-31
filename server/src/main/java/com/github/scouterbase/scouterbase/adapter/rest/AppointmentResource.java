package com.github.scouterbase.scouterbase.adapter.rest;

import com.github.scouterbase.scouterbase.domain.Appointment;
import com.github.scouterbase.scouterbase.domain.AppointmentRepository;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentResource {

  private final AppointmentRepository appointmentRepository;

  public AppointmentResource(AppointmentRepository appointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }

  @GetMapping

  public List<Appointment> getAllAppointments(){
    return appointmentRepository.findAll();
  }

  @GetMapping("/{id}")
  public Appointment getAppointment(@PathVariable long id){
    return appointmentRepository.findById(id).orElseThrow();
  }

  @PostMapping
  public Appointment createAppointment(Appointment appointment) {
     return appointmentRepository.save(appointment);
  }

  @PutMapping
  public Appointment updateAppointment(Appointment appointment) {
    return appointmentRepository.save(appointment);
  }

  @DeleteMapping("/{id}")
  public void deleteAppointment(@PathVariable long id){
    appointmentRepository.delete(appointmentRepository.findById(id).orElseThrow());
  }

}
