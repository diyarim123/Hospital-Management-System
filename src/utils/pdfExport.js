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