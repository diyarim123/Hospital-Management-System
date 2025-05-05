import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';

import { DashboardContent } from '../../../layouts/dashboard';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// importing getting functions
import { getPatients } from '../../../redux/patients/patientRequests';
import { getDoctors } from '../../../redux/doctors/doctorsRequests';
import { getStaff } from '../../../redux/staff/staffRequests';
import { getDepartments } from '../../../redux/departments/departmentRequests';
import { getMedicals } from '../../../redux/medical_records/medicalRequests';
import { getServices } from '../../../redux/services/serviceRequests';
import { getRooms } from '../../../redux/rooms/roomRequests';
import { getAppointments } from '../../../redux/appointments/appointmentsRequests';
import { getBillings } from '../../../redux/billings/billingRequests';

// importing resetting functions
import { reset as resetPatients } from "../../../redux/patients/patientsSlice";
import { reset as resetDoctors } from "../../../redux/doctors/doctorsSlice";
import { reset as resetStaff } from "../../../redux/staff/staffSlice";
import { reset as resetDepartments } from "../../../redux/departments/departmentsSlice";
import { reset as resetMedicals } from "../../../redux/medical_records/medicalSlice";
import { reset as resetServices } from "../../../redux/services/servicesSlice";
import { reset as resetRooms } from "../../../redux/rooms/roomsSlice";
import { reset as resetAppointments } from "../../../redux/appointments/appointmentsSlice";
import { reset as resetBillings } from "../../../redux/billings/billingsSlice";

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaff());
    dispatch(getDepartments());
    dispatch(getMedicals());
    dispatch(getServices());
    dispatch(getRooms());
    dispatch(getAppointments());
    dispatch(getBillings());

    return () => {
      dispatch(resetPatients());
      dispatch(resetDoctors())
      dispatch(resetStaff())
      dispatch(resetDepartments())
      dispatch(resetMedicals())
      dispatch(resetServices())
      dispatch(resetRooms())
      dispatch(resetAppointments())
      dispatch(resetBillings())
    };
  }, [dispatch]);

  // Select data lengths
  const { patients_loading, patients_data } = useSelector((state) => state.patients);
  const { doctors_loading, doctors_data } = useSelector((state) => state.doctors);
  const { staff_loading, staff_data } = useSelector((state) => state.staff);
  const { departments_loading, departments_data } = useSelector((state) => state.departments);
  const { medicals_loading, medicals_data } = useSelector((state) => state.medicals);
  const { services_loading, services_data } = useSelector((state) => state.services);
  const { rooms_loading, rooms_data } = useSelector((state) => state.rooms);
  const { appointments_loading, appointments_data } = useSelector((state) => state.appointments);
  const { billings_loading, billings_data} = useSelector((state) => state.billings);


  const isLoading =
  patients_loading ||
  doctors_loading ||
  staff_loading ||
  departments_loading ||
  medicals_loading ||
  services_loading ||
  rooms_loading ||
  appointments_loading ||
  billings_loading;

  if (isLoading) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography variant="h6">Loading Dashboard...</Typography>
      </DashboardContent>
    );
  }  

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, {user.username} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Patients"
            percent={13.6}
            total={patients_data?.length || 0}
            icon={<img alt="icon" src="/assets/icons/glass/patient.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 87, 82, 84, 45, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Appointments"
            percent={-0.1}
            total={appointments_data?.length || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/appointments.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 29, 69, 73, 17, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Medical Records"
            percent={3.6}
            total={medicals_data?.length || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/medical-records.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 15, 23, 30, 47, 67, 62, 40],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Doctors"
            percent={9.8}
            total={doctors_data?.length || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/doctor.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 25, 23, 12, 47, 63, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Staff Members"
            percent={19.2}
            total={staff_data?.length || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/staff.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [51, 30, 43, 54, 67, 20, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Rooms"
            percent={30.4}
            total={rooms_data?.length || 0}
            color="primary"
            icon={<img alt="icon" src="/assets/icons/glass/room.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [67, 30, 23, 13, 47, 76, 62, 35],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Departments"
            percent={5.3}
            total={departments_data?.length || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/department.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [76, 30, 23, 48, 47, 35, 62, 27],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Services"
            percent={25.2}
            total={services_data?.length || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/healthcare.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [53, 30, 37, 54, 28, 40, 33, 73],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Billings"
            percent={73.2}
            total={billings_data?.length || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/billings.png" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [51, 30, 58, 54, 13, 46, 62, 73],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
