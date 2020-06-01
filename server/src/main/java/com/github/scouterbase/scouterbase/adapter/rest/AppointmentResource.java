package com.github.scouterbase.scouterbase.adapter.rest;

import com.github.scouterbase.scouterbase.domain.Appointment;
import com.github.scouterbase.scouterbase.domain.AppointmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentResource {

  private final AppointmentRepository appointmentRepository;

  public AppointmentResource(final AppointmentRepository appointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }

  @GetMapping
  public List<Appointment> getAllAppointments(){
    return this.appointmentRepository.findAll();
  }

  @GetMapping("/{id}")
  public Appointment getAppointment(@PathVariable final long id){
    return this.appointmentRepository.findById(id).orElseThrow();
  }

  @PostMapping
  public Appointment createAppointment(final Appointment appointment) {
     return this.appointmentRepository.save(appointment);
  }

  @PutMapping
  public Appointment updateAppointment(final Appointment appointment) {
    return this.appointmentRepository.save(appointment);
  }

  @DeleteMapping("/{id}")
  public void deleteAppointment(@PathVariable final long id){
    this.appointmentRepository.delete(this.appointmentRepository.findById(id).orElseThrow());
  }

}
