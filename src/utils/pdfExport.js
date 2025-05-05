import JsPDF from 'jspdf'; // ✅ default import, lowercase jsPDF
import autoTable from 'jspdf-autotable'; // ✅ named function

export const exportPatientsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Patients List', 14, 16);

  const tableColumn = [
    'First Name',
    'Last Name',
    'Birth Date',
    'Gender',
    'Phone',
    'Address',
    'Email',
  ];

  const tableRows = dataFiltered.map((patient) => [
    patient.first_name,
    patient.last_name,
    patient.date_of_birth
      ? new Date(patient.date_of_birth).toISOString().substring(0, 10)
      : 'N/A',
    patient.gender,
    patient.contact_number,
    patient.address,
    patient.email,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('patients.pdf');
};

export const exportDoctorsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Doctors List', 14, 16);

  const tableColumn = [
    'First Name',
    'Last Name',
    'Specialization',
    'Gender',
    'Phone',
    'Department',
  ];

  const tableRows = dataFiltered.map((doctor) => [
    doctor.first_name,
    doctor.last_name,
    doctor.specialization,
    doctor.gender,
    doctor.contact_number,
    doctor.department_name
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('doctors.pdf');
};

export const exportStaffToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Staff List', 14, 16);

  const tableColumn = [
    'First Name',
    'Last Name',
    'Role',
    'Gender',
    'Phone',
    'Department',
  ];

  const tableRows = dataFiltered.map((staff) => [
    staff.first_name,
    staff.last_name,
    staff.role,
    staff.gender,
    staff.contact_number,
    staff.department_name
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('staff.pdf');
};

export const exportServicesToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Services List', 14, 16);

  const tableColumn = [
    'Service Name',
    'Cost',
    'Description'
  ];

  const tableRows = dataFiltered.map((service) => [
    service.service_name,
    service.cost,
    service.description
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('services.pdf');
};


export const exportDepartmentsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Departments List', 14, 16);

  const tableColumn = [
    'Department',
    'Description'
  ];

  const tableRows = dataFiltered.map((department) => [
    department.department_name,
    department.description
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('departments.pdf');
};


export const exportRoomsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Rooms List', 14, 16);

  const tableColumn = [
    'Room Number',
    'Room Type',
    'Capacity',
    'Availability'
  ];

  const tableRows = dataFiltered.map((room) => [
    room.room_number,
    room.room_type,
    room.capacity,
    room.availability_type
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('rooms.pdf');
};


export const exportRecordsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Record List', 14, 16);

  const tableColumn = [
    "Diagnosis",
    "Treatment",
    "Prescription",
    "Record Date",
    "Patient Name",
    "Doctor Name",
  ];

  const tableRows = dataFiltered.map((record) => [
    record.diagnosis,
    record.treatment,
    record.prescription,
    record.record_date
      ? new Date(record.record_date).toISOString().substring(0, 10)
      : 'N/A',
      `${record.patient_first_name} ${record.patient_last_name}`,
      `${record.doctor_first_name} ${record.doctor_last_name}`,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('records.pdf');
};

export const exportBillingsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Billings List', 14, 16);

  const tableColumn = [
    "Amount",
    "Payment Status",
    "Patient Name",
    "Bill Date",
  ];

  const tableRows = dataFiltered.map((bill) => [
    bill.amount,
    bill.payment_status,
    `${bill.patient_first_name} ${bill.patient_last_name}`,
    bill.bill_date
    ? new Date(bill.bill_date).toISOString().substring(0, 10)
    : 'N/A',
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('billings.pdf');
};

export const exportAppointmentsToPDF = (dataFiltered) => {
  const doc = new JsPDF(); 

  doc.text('Appointments List', 14, 16);

  const tableColumn = [
    "Status",
    "Appointment Time",
    "Patient Name",
    "Doctor Name",
  ];

  const tableRows = dataFiltered.map((appointment) => [
    appointment.status,
    appointment.appointment_time
      ? new Date(appointment.appointment_time).toISOString().substring(0, 10)
      : 'N/A',
    `${appointment.patient_first_name} ${appointment.patient_last_name}`,
    `${appointment.doctor_first_name} ${appointment.doctor_last_name}`,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  doc.save('appointments.pdf');
};