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
