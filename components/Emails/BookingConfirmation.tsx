import * as React from 'react';

interface BookingDetails {
  date: string;
  time: string;
  service: string;
  dentist: string;
  location: string;
  address: string;
  patientName: string;
  bookingId: string;
}

export const BookingConfirmationEmail = ({ bookingDetails }: { bookingDetails: BookingDetails }) => (
  <div style={containerStyle}>
    <div style={headerStyle}>
      <h1 style={titleStyle}>Your Appointment is Confirmed!</h1>
      <p style={subtitleStyle}>We look forward to seeing you at BrightSmile Dental</p>
    </div>
    
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Appointment Details</h2>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Patient:</span>
        <span style={valueStyle}>{bookingDetails.patientName}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Date & Time:</span>
        <span style={valueStyle}>{bookingDetails.date} at {bookingDetails.time}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Service:</span>
        <span style={valueStyle}>{bookingDetails.service}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Dentist:</span>
        <span style={valueStyle}>Dr. {bookingDetails.dentist}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Location:</span>
        <span style={valueStyle}>{bookingDetails.location}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Address:</span>
        <span style={valueStyle}>{bookingDetails.address}</span>
      </div>
      
      <div style={detailRowStyle}>
        <span style={labelStyle}>Booking ID:</span>
        <span style={valueStyle}>{bookingDetails.bookingId}</span>
      </div>
    </div>
    
    <div style={instructionsStyle}>
      <h3 style={instructionsTitleStyle}>Preparation for Your Visit</h3>
      <ul style={listStyle}>
        <li>Please arrive 10 minutes before your appointment</li>
        <li>Bring your insurance card if applicable</li>
        <li>Brush your teeth before coming in</li>
        <li>Complete any new patient forms if this is your first visit</li>
      </ul>
    </div>
    
    <div style={footerStyle}>
      <p style={footerTextStyle}>Need to reschedule or cancel? Please call us at (555) 123-4567 at least 24 hours in advance.</p>
      <p style={footerTextStyle}>© {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
    </div>
  </div>
);

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  color: '#333',
  lineHeight: 1.6,
};

const headerStyle = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '20px',
  textAlign: 'center' as const,
  borderRadius: '8px 8px 0 0',
};

const titleStyle = {
  margin: 0,
  fontSize: '24px',
};

const subtitleStyle = {
  margin: '8px 0 0',
  fontSize: '16px',
  opacity: 0.9,
};

const cardStyle = {
  backgroundColor: '#f7fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const cardTitleStyle = {
  margin: '0 0 15px',
  fontSize: '20px',
  color: '#2b6cb0',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '10px',
};

const detailRowStyle = {
  display: 'flex',
  marginBottom: '10px',
};

const labelStyle = {
  fontWeight: 'bold',
  width: '120px',
  color: '#4a5568',
};

const valueStyle = {
  flex: 1,
};

const instructionsStyle = {
  backgroundColor: '#ebf8ff',
  borderLeft: '4px solid #4299e1',
  padding: '15px',
  margin: '20px 0',
  borderRadius: '0 4px 4px 0',
};

const instructionsTitleStyle = {
  margin: '0 0 10px',
  fontSize: '18px',
  color: '#2b6cb0',
};

const listStyle = {
  margin: 0,
  paddingLeft: '20px',
};

const footerStyle = {
  marginTop: '30px',
  paddingTop: '20px',
  borderTop: '1px solid #e2e8f0',
  fontSize: '14px',
  color: '#718096',
  textAlign: 'center' as const,
};

const footerTextStyle = {
  margin: '5px 0',
};