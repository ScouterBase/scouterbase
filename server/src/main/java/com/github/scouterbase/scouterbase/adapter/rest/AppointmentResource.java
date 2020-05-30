package com.github.scouterbase.scouterbase.adapter.rest;

import com.github.scouterbase.scouterbase.domain.Appointment;
import com.github.scouterbase.scouterbase.domain.AppointmentRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentResource {

  private AppointmentRepository appointmentRepository;

  public AppointmentResource(AppointmentRepository appointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }

  @GetMapping
  public List<Appointment> getAllAppointments(){
    return appointmentRepository.findAll();
  }
}
