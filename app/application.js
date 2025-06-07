import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Checkbox from 'expo-checkbox'; // Keep Checkbox for the 'For Construction Owned By An Enterprise'
import DateTimePicker from '@react-native-community/datetimepicker'; // Import for date picker

// Helper function to format date for display and input
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  // Ensure date is valid before formatting
  if (isNaN(d.getTime())) {
    return ''; // Return empty string for invalid dates
  }
  return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Helper function to get today's date formatted
const getTodayDateFormatted = () => {
  const today = new Date();
  return formatDate(today);
};

// UploadScreen Component - Simulates a separate upload.js file
// Note: This component is currently placeholder and would be replaced by actual navigation
// in a full Expo Router setup.
const UploadScreen = ({ onGoBack }) => {
  return (
    <View style={uploadScreenStyles.container}>
      <Text style={uploadScreenStyles.title}>Upload Your Files</Text>
      <Text style={uploadScreenStyles.description}>
        This section is dedicated to uploading necessary documents for your building permit application.
        You can integrate file selection components here.
      </Text>
      {/* Placeholder for actual file upload components */}
      <View style={uploadScreenStyles.uploadArea}>
        <Text style={uploadScreenStyles.uploadText}>Drag & Drop Files Here or Click to Browse</Text>
        <TouchableOpacity style={uploadScreenStyles.browseButton}>
          <Text style={uploadScreenStyles.browseButtonText}>Browse Files</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={uploadScreenStyles.goBackButton} onPress={onGoBack}>
        <Text style={uploadScreenStyles.goBackButtonText}>Go Back to Form</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the UploadScreen
const uploadScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
    width: '95%',
    maxWidth: 700,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
    lineHeight: 22,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 30,
    backgroundColor: '#e9f5ff',
  },
  uploadText: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#6c757d',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


// Main App Component
export default function App() {
  // State to manage form data
  const [formData, setFormData] = useState({
    ownerLastName: '',
    ownerFirstName: '',
    ownerMI: '',
    ownerTin: '',
    forConstructionOwnedByEnterprise: false,
    formOfOwnership: '',
    ownerAddress: '',
    ownerProvince: '',
    ownerHouseNo: '',
    ownerStreet: '',
    ownerCityMunicipality: '',
    ownerBarangay: '',
    ownerContact: '',
    ownerContactPH: '',
    // Changed to a single string for radio button selection
    typeOfOccupancy: '',
    locationLotNo: '',
    locationBlkNo: '',
    locationTCTNo: '',
    locationTaxDecNo: '',
    locationStreet: '',
    locationBrgy: '',
    locationCityMunicipality: '',
    scopeOfWorkType: '',
    scopeOfWorkDetails: '',
    useOfOccupancyGroup: '',
    useOfOccupancyType: '',
    useOfOccupancyOthers: '',
    occupancyClassified: '',
    numberUnits: '',
    numberStorey: '',
    totalFloorArea: '',
    lotArea: '',
    totalEstimatedCost: '',
    costBuilding: '',
    costElectrical: '',
    costMechanical: '',
    costElectronics: '',
    costPlumbing: '',
    costEquipmentInstalled: '',
    proposedDateCompletion: getTodayDateFormatted(), // Automatically set to today's date
    expectedDateCompletion: '', // Will use date picker
    architectEngineerName: '',
    architectEngineerAddress: '',
    architectEngineerPRCNo: '',
    architectEngineerValidity: '',
    architectEngineerPTRNo: '',
    architectEngineerDateIssued: getTodayDateFormatted(), // Automatically set to today's date
    architectEngineerIssuedAt: '',
    architectEngineerTin: '',
    applicantName: '',
    applicantAddress: '',
    applicantGovtIdNo: '',
    applicantIdDateIssued: getTodayDateFormatted(), // Automatically set to today's date
    applicantIdPlaceIssued: '',
    lotOwnerName: '',
    lotOwnerDate: getTodayDateFormatted(), // Automatically set to today's date
    lotOwnerAddress: '',
    lotOwnerGovtIdNo: '',
    lotOwnerIdDateIssued: getTodayDateFormatted(), // Automatically set to today's date
    lotOwnerIdPlaceIssued: '',
  });

  // States for UI navigation and modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUploadScreen, setShowUploadScreen] = useState(false); // State to control visibility of UploadScreen
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  // Date picker visibility states for each date field
  const [showProposedDatePicker, setShowProposedDatePicker] = useState(false);
  const [showExpectedDatePicker, setShowExpectedDatePicker] = useState(false);
  const [showArchitectEngineerDateIssuedPicker, setShowArchitectEngineerDateIssuedPicker] = useState(false);
  const [showApplicantIdDateIssuedPicker, setShowApplicantIdDateIssuedPicker] = useState(false);
  const [showLotOwnerDatePicker, setShowLotOwnerDatePicker] = useState(false);
  const [showLotOwnerIdDateIssuedPicker, setShowLotOwnerIdDateIssuedPicker] = useState(false);


  // Options for Type of Occupancy (for radio buttons)
  const occupancyOptions = [
    { label: 'Simple', value: 'simple' },
    { label: 'New', value: 'new' },
    { label: 'Renewal', value: 'renewal' },
    { label: 'Complex*', value: 'complex' },
    { label: 'Amendatory', value: 'amendatory' },
    { label: 'Locational Clearance', value: 'locational_clearance' },
    { label: 'Fire Safety Evaluation Clearance', value: 'fire_safety' },
  ];

  // Function to handle general input changes
  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle radio button changes for 'typeOfOccupancy'
  const handleOccupancyChange = (optionValue) => {
    setFormData((prevData) => ({
      ...prevData,
      // If the clicked option is already selected, unselect it (toggle).
      // Otherwise, select the new option.
      typeOfOccupancy: prevData.typeOfOccupancy === optionValue ? '' : optionValue,
    }));
  };

  // Generic date change handler for DateTimePicker
  const onDateChange = (event, selectedDate, fieldName, setDatePickerVisibility) => {
    const currentDate = selectedDate || new Date();
    setDatePickerVisibility(Platform.OS === 'ios'); // Keep picker open on iOS until manually dismissed
    handleChange(fieldName, formatDate(currentDate));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const appNum = `APP-${Math.floor(Math.random() * 1000000000)}`;
    setApplicationNumber(appNum);
    setShowSuccessModal(true);
  };

  // Function to handle "Continue" after submission
  const handleContinue = () => {
    setShowSuccessModal(false);
    setIsSubmitted(true);
  };

  // Function to reset the form and go back to input mode
  const handleGoBackToEdit = () => {
    setIsSubmitted(false);
    setShowUploadScreen(false); // Ensure upload screen is hidden when going back to edit
    // Optionally reset form data here if needed for fresh start
    // setFormData(initialFormData);
  };

  // Function to show the UploadScreen
  const handleShowUploadScreen = () => {
    setShowUploadScreen(true);
  };

  // Function to hide the UploadScreen and return to the form
  const handleGoBackFromUpload = () => {
    setShowUploadScreen(false);
  };

  // Determines if the form fields should be editable
  const isFormEditable = !isSubmitted;

  // Function to handle printing/downloading the form
  const printForm = async () => {
    // Construct HTML content to print, mirroring the form's layout and data
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Building Permit Application Form</title>
          <style>
              /* Universal box-sizing for consistent layout */
              * {
                  box-sizing: border-box;
              }
              /* Define page size and margins for print */
              @page {
                  size: A4 portrait; /* Standard A4 paper in portrait orientation */
                  margin: 0.8cm; /* Slightly reduced margin to fit more content */
              }
              body {
                  font-family: 'Inter', sans-serif;
                  margin: 0; /* Remove body margin to let @page rule control it */
                  padding: 0;
                  color: #333;
                  font-size: 10px; /* Further reduced font size for print density */
                  line-height: 1.25; /* Adjusted line height */
              }
              .container {
                  width: 100%; /* Take full width of the printable area */
                  max-width: 750px; /* Still a max width for readability */
                  margin: 0 auto;
                  padding: 15px;
                  border: 1px solid #ccc;
                  box-shadow: none; /* Remove box-shadow for print */
                  page-break-after: auto; /* Allow page breaks after container if content is large */
              }
              h1 {
                  text-align: center;
                  color: #555;
                  margin-bottom: 18px; /* Reduced margin */
                  font-size: 16px; /* Further reduced for print */
                  page-break-after: avoid; /* Avoid page break directly after heading */
              }
              .section-title {
                  font-weight: bold;
                  margin-top: 15px;
                  margin-bottom: 6px; /* Reduced margin */
                  border-bottom: 1px solid #eee;
                  padding-bottom: 3px;
                  font-size: 12px; /* Further reduced for print */
                  page-break-after: avoid; /* Keep title with its content */
                  page-break-before: avoid; /* Prevent page break right before a title */
              }
              .field {
                  margin-bottom: 6px; /* Reduced margin */
                  page-break-inside: avoid; /* Keep field content together */
              }
              .field-label {
                  font-weight: bold;
                  margin-bottom: 2px;
                  display: block;
                  font-size: 9.5px; /* Further reduced */
                  color: #666;
              }
              .input-box {
                  border: 1px solid #ccc;
                  padding: 4px; /* Reduced padding */
                  border-radius: 3px;
                  background-color: #f9f9f9;
                  min-height: 15px; /* Adjusted min-height */
                  word-wrap: break-word;
                  font-size: 10.5px; /* Further reduced */
              }
              .input-row {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  margin-bottom: 6px; /* Reduced margin */
                  page-break-inside: avoid; /* Keep rows together if possible */
                  page-break-before: avoid; /* Avoid breaking before a row */
              }
              .input-col {
                  margin-bottom: 6px;
              }
              /* Column widths adjusted for print density */
              .w-full { width: 100%; }
              .w-half { width: 49%; }
              .w-third { width: 32%; }
              .w-quarter { width: 23%; }
              .w-two-third { width: 65%; }

              .radio-group { /* Changed from checkbox-group */
                  display: flex;
                  flex-wrap: wrap;
                  gap: 8px; /* Reduced gap */
                  margin-top: 7px;
                  margin-bottom: 7px;
                  page-break-inside: avoid;
              }
              .radio-item { /* Changed from checkbox-item */
                  display: flex;
                  align-items: center;
                  font-size: 10.5px; /* Further reduced */
              }
              .radio-box { /* Changed from checkbox-box */
                  width: 11px; /* Smaller radio */
                  height: 11px;
                  border: 1px solid #999;
                  border-radius: 50%; /* Make it round */
                  margin-right: 3px;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #fff;
                  flex-shrink: 0;
              }
              .radio-checked-inner { /* New for inner dot */
                  width: 7px; /* Smaller inner dot */
                  height: 7px;
                  border-radius: 50%;
                  background-color: #007bff;
              }

              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 7px;
                  margin-bottom: 10px; /* Reduced margin */
                  page-break-inside: avoid; /* Keep tables together */
              }
              th, td {
                  border: 1px solid #ddd;
                  padding: 4px; /* Reduced padding */
                  text-align: left;
                  font-size: 10.5px; /* Further reduced */
              }
              th {
                  background-color: #f2f2f2;
                  font-weight: bold;
              }
              .cost-table td:nth-child(2) { width: 25%; }
              .cost-table td:nth-child(3) { width: 25%; }
              .cost-table td:nth-child(4) { width: 20%; }

              .signatures-row {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 15px;
                  page-break-inside: avoid; /* Keep signature block together */
                  page-break-before: avoid; /* Avoid breaking before signature block */
              }
              .signature-box {
                  border: 1px solid #ccc;
                  padding: 7px; /* Reduced padding */
                  text-align: center;
                  width: 48%;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: center;
                  font-size: 8.5px; /* Smaller font for labels */
                  min-height: 50px; /* Adjusted min-height for signature box */
              }
              .signature-line {
                  border-top: 1px solid #000;
                  width: 80%;
                  margin-top: 10px; /* Adjusted margin */
                  margin-bottom: 2px; /* Adjusted margin */
              }
              .signature-label {
                  font-style: italic;
                  color: #555;
              }
              .bottom-section-text {
                  font-size: 8.5px;
                  text-align: center;
                  margin-top: 7px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>UNIFIED APPLICATION FORM FOR BUILDING PERMIT</h1>

              <div class="radio-group"> {/* Changed from checkbox-group */}
                  ${occupancyOptions.map(option => `
                      <div class="radio-item"> {/* Changed from checkbox-item */}
                          <div class="radio-box"> {/* Changed from checkbox-box */}
                              ${formData.typeOfOccupancy === option.value ? '<span class="radio-checked-inner"></span>' : ''}
                          </div> ${option.label}
                      </div>
                  `).join('')}
              </div>

              <div class="section-title">Owner / Applicant</div>
              <div class="input-row">
                  <div class="input-col w-quarter">
                      <label class="field-label">Last Name</label>
                      <div class="input-box">${formData.ownerLastName || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">First Name</label>
                      <div class="input-box">${formData.ownerFirstName || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">M.I</label>
                      <div class="input-box">${formData.ownerMI || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">TIN</label>
                      <div class="input-box">${formData.ownerTin || ''}</div>
                  </div>
              </div>
              <div class="checkbox-item" style="margin-bottom: 10px;">
                  <div class="checkbox-box ${formData.forConstructionOwnedByEnterprise ? 'checkbox-checked' : ''}"><span class="checkbox-check-mark">${formData.forConstructionOwnedByEnterprise ? '&#10003;' : ''}</span></div> For Construction Owned By An Enterprise
              </div>
              <div class="input-row">
                  <div class="input-col w-full">
                      <label class="field-label">Form of Ownership</label>
                      <div class="input-box">${formData.formOfOwnership || ''}</div>
                  </div>
              </div>

              <div class="section-title">Address</div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Province</label>
                      <div class="input-box">${formData.ownerProvince || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">City/Municipality</label>
                      <div class="input-box">${formData.ownerCityMunicipality || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-quarter">
                      <label class="field-label">No.</label>
                      <div class="input-box">${formData.ownerHouseNo || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Street</label>
                      <div class="input-box">${formData.ownerStreet || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">Barangay</label>
                      <div class="input-box">${formData.ownerBarangay || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Contact No.</label>
                      <div class="input-box">${formData.ownerContact || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">PH+</label>
                      <div class="input-box">${formData.ownerContactPH || ''}</div>
                  </div>
              </div>

              <div class="section-title">Location Of Construction</div>
              <div class="input-row">
                  <div class="input-col w-quarter">
                      <label class="field-label">Lot No.</label>
                      <div class="input-box">${formData.locationLotNo || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">BLK No.</label>
                      <div class="input-box">${formData.locationBlkNo || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">TCT No.</label>
                      <div class="input-box">${formData.locationTCTNo || ''}</div>
                  </div>
                  <div class="input-col w-quarter">
                      <label class="field-label">Current Tax DEC. No.</label>
                      <div class="input-box">${formData.locationTaxDecNo || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Street</label>
                      <div class="input-box">${formData.locationStreet || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Barangay</label>
                      <div class="input-box">${formData.locationBrgy || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-full">
                      <label class="field-label">City/Municipality</label>
                      <div class="input-box">${formData.locationCityMunicipality || ''}</div>
                  </div>
              </div>

              <div class="section-title">Scope of Work</div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Type</label>
                      <div class="input-box">${formData.scopeOfWorkType || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Details</label>
                      <div class="input-box">${formData.scopeOfWorkDetails || ''}</div>
                  </div>
              </div>

              <div class="section-title">User or Character of Occupancy</div>
              <div class="input-row">
                  <div class="input-col w-third">
                      <label class="field-label">Group</label>
                      <div class="input-box">${formData.useOfOccupancyGroup || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Type</label>
                      <div class="input-box">${formData.useOfOccupancyType || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Others</label>
                      <div class="input-box">${formData.useOfOccupancyOthers || ''}</div>
                  </div>
              </div>

              <div class="section-title">Occupancy Classified</div>
              <table class="cost-table">
                  <tr>
                      <th></th>
                      <th>Total Estimated Cost</th>
                      <th>Cost of Equipment Installed</th>
                      <th></th>
                  </tr>
                  <tr>
                      <td>Occupancy Classified</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.occupancyClassified || ''}</div></td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costEquipmentInstalled || ''}</div></td>
                      <td>₱</td>
                  </tr>
                  <tr>
                      <td>Number of Units</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.numberUnits || ''}</div></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>Number of Storey</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.numberStorey || ''}</div></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>Total Floor Area</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.totalFloorArea || ''}</div></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>Lot Area</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.lotArea || ''}</div></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td>Building</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costBuilding || ''}</div></td>
                      <td></td>
                      <td>₱</td>
                  </tr>
                  <tr>
                      <td>Electrical</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costElectrical || ''}</div></td>
                      <td></td>
                      <td>₱</td>
                  </tr>
                  <tr>
                      <td>Mechanical</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costMechanical || ''}</div></td>
                      <td></td>
                      <td>₱</td>
                  </tr>
                  <tr>
                      <td>Electronics</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costElectronics || ''}</div></td>
                      <td></td>
                      <td>₱</td>
                  </tr>
                  <tr>
                      <td>Plumbing</td>
                      <td><div class="input-box" style="border:none; background:none; padding:0;">${formData.costPlumbing || ''}</div></td>
                      <td></td>
                      <td>₱</td>
                  </tr>
              </table>

              <div class="section-title">Proposed Date of Construction / Expected Date of Completion</div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Proposed Date of Construction</label>
                      <div class="input-box">${formData.proposedDateCompletion || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Expected Date of Completion</label>
                      <div class="input-box">${formData.expectedDateCompletion || ''}</div>
                  </div>
              </div>

              <div class="section-title">Full-Time Inspector and Supervisor of Construction Works (Representing the Owner)</div>
              <div class="field" style="margin-bottom: 20px;">
                  <div class="input-box" style="min-height: 40px; text-align:center;">${formData.architectEngineerName || ''}</div>
                  <label class="field-label" style="text-align: center; margin-top: 5px;">ARCHITECT OR CIVIL ENGINEER (Signed and Sealed Over Printed Name)</label>
                  <div class="input-box" style="margin-top: 5px; text-align:center;">${formData.architectEngineerDateIssued || ''}</div>
                  <label class="field-label" style="text-align: center; margin-top: 5px;">Date</label>
              </div>

              <div class="input-row">
                  <div class="input-col w-full">
                      <label class="field-label">Address</label>
                      <div class="input-box">${formData.architectEngineerAddress || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">PRC No.</label>
                      <div class="input-box">${formData.architectEngineerPRCNo || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Validity</label>
                      <div class="input-box">${formData.architectEngineerValidity || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">PTR No.</label>
                      <div class="input-box">${formData.architectEngineerPTRNo || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Date Issued</label>
                      <div class="input-box">${formData.architectEngineerDateIssued || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-half">
                      <label class="field-label">Issued at</label>
                      <div class="input-box">${formData.architectEngineerIssuedAt || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">TIN</label>
                      <div class="input-box">${formData.architectEngineerTin || ''}</div>
                  </div>
              </div>

              <div class="signatures-row">
                  <div class="signature-box">
                      <div style="height: 30px;"></div> <!-- Reduced height for signature space -->
                      <div class="signature-line"></div>
                      <span class="signature-label">Applicant</span>
                      <div class="input-box w-full" style="border:none; background:none; text-align:center; margin-top: 5px;">${formData.applicantDateIssued || ''}</div>
                      <span class="signature-label">Date</span>
                  </div>
                  <div class="signature-box">
                      <div style="height: 30px;"></div> <!-- Reduced height for signature space -->
                      <div class="signature-line"></div>
                      <span class="signature-label">Lot Owner / Authorized Representative</span>
                      <div class="input-box w-full" style="border:none; background:none; text-align:center; margin-top: 5px;">${formData.lotOwnerDate || ''}</div>
                      <span class="signature-label">Date</span>
                  </div>
              </div>
              <div class="input-row" style="margin-top: 15px;">
                  <div class="input-col w-half">
                      <label class="field-label">Address</label>
                      <div class="input-box">${formData.applicantAddress || ''}</div>
                  </div>
                  <div class="input-col w-half">
                      <label class="field-label">Address</label>
                      <div class="input-box">${formData.lotOwnerAddress || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-third">
                      <label class="field-label">Gov't Issued ID No.</label>
                      <div class="input-box">${formData.applicantGovtIdNo || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Date Issued</label>
                      <div class="input-box">${formData.applicantIdDateIssued || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Place Issued</label>
                      <div class="input-box">${formData.applicantIdPlaceIssued || ''}</div>
                  </div>
              </div>
              <div class="input-row">
                  <div class="input-col w-third">
                      <label class="field-label">Gov't Issued ID No.</label>
                      <div class="input-box">${formData.lotOwnerGovtIdNo || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Date Issued</label>
                      <div class="input-box">${formData.lotOwnerIdDateIssued || ''}</div>
                  </div>
                  <div class="input-col w-third">
                      <label class="field-label">Place Issued</label>
                      <div class="input-box">${formData.lotOwnerIdPlaceIssued || ''}</div>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;

    try {
      await Print.printAsync({ html: htmlContent, orientation: Print.Orientation.Portrait });
    } catch (error) {
      console.error('Error downloading/printing document:', error);
      alert('Failed to download/print the document. Please try again.');
    }
  };


  // Render the form, dynamically changing based on isSubmitted state
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Conditionally render the form or the UploadScreen */}
      {showUploadScreen ? (
        <UploadScreen onGoBack={handleGoBackFromUpload} />
      ) : (
        <ScrollView style={styles.formContainer} ref={formRef}>
          <Text style={styles.title}>UNIFIED APPLICATION FORM FOR BUILDING PERMIT</Text>

          {/* Type of Occupancy Sought (Radio Buttons) */}
          <Text style={styles.sectionHeader}>Type of Occupancy Sought (by application)</Text>
          <View style={styles.radioGroup}>
            {occupancyOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioItem}
                onPress={() => isFormEditable && handleOccupancyChange(option.value)}
                disabled={!isFormEditable}
              >
                <View style={[styles.radioBox, formData.typeOfOccupancy === option.value && styles.radioChecked]}>
                  {formData.typeOfOccupancy === option.value && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Owner (Applicant) Section */}
          <Text style={styles.sectionHeader}>Owner / Applicant</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="Last Name"
              value={formData.ownerLastName}
              onChangeText={(text) => handleChange('ownerLastName', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="First Name"
              value={formData.ownerFirstName}
              onChangeText={(text) => handleChange('ownerFirstName', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="M.I"
              value={formData.ownerMI}
              onChangeText={(text) => handleChange('ownerMI', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="TIN"
              value={formData.ownerTin}
              onChangeText={(text) => handleChange('ownerTin', text)}
              editable={isFormEditable}
            />
          </View>
          <View style={styles.checkboxItem}>
            <Checkbox
              value={formData.forConstructionOwnedByEnterprise}
              onValueChange={(value) => handleChange('forConstructionOwnedByEnterprise', value)}
              color={formData.forConstructionOwnedByEnterprise ? '#007bff' : undefined}
              disabled={!isFormEditable}
            />
            <Text style={styles.checkboxLabel}>For Construction Owned By An Enterprise</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Form of Ownership"
            value={formData.formOfOwnership}
            onChangeText={(text) => handleChange('formOfOwnership', text)}
            editable={isFormEditable}
          />

          {/* Owner Address Section */}
          <Text style={styles.sectionHeader}>Address</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Province"
              value={formData.ownerProvince}
              onChangeText={(text) => handleChange('ownerProvince', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City/Municipality"
              value={formData.ownerCityMunicipality}
              onChangeText={(text) => handleChange('ownerCityMunicipality', text)}
              editable={isFormEditable}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="No."
              value={formData.ownerHouseNo}
              onChangeText={(text) => handleChange('ownerHouseNo', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Street"
              value={formData.ownerStreet}
              onChangeText={(text) => handleChange('ownerStreet', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.quarterInput]}
              placeholder="Barangay"
              value={formData.ownerBarangay}
              onChangeText={(text) => handleChange('ownerBarangay', text)}
              editable={isFormEditable}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Contact No."
              value={formData.ownerContact}
              onChangeText={(text) => handleChange('ownerContact', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="PH+"
              value={formData.ownerContactPH}
              onChangeText={(text) => handleChange('ownerContactPH', text)}
              editable={isFormEditable}
            />
          </View>


          {/* Location of Construction */}
          <Text style={styles.sectionHeader}>Location Of Construction</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.quarterInput]} placeholder="Lot No." value={formData.locationLotNo} onChangeText={(text) => handleChange('locationLotNo', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.quarterInput]} placeholder="BLK No." value={formData.locationBlkNo} onChangeText={(text) => handleChange('locationBlkNo', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.quarterInput]} placeholder="TCT No." value={formData.locationTCTNo} onChangeText={(text) => handleChange('locationTCTNo', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.quarterInput]} placeholder="Current Tax DEC. No." value={formData.locationTaxDecNo} onChangeText={(text) => handleChange('locationTaxDecNo', text)} editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Street" value={formData.locationStreet} onChangeText={(text) => handleChange('locationStreet', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Barangay" value={formData.locationBrgy} onChangeText={(text) => handleChange('locationBrgy', text)} editable={isFormEditable} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="City/Municipality"
            value={formData.locationCityMunicipality}
            onChangeText={(text) => handleChange('locationCityMunicipality', text)}
            editable={isFormEditable}
          />

          {/* Scope of Work */}
          <Text style={styles.sectionHeader}>Scope of Work</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Type"
              value={formData.scopeOfWorkType}
              onChangeText={(text) => handleChange('scopeOfWorkType', text)}
              editable={isFormEditable}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Details"
              value={formData.scopeOfWorkDetails}
              onChangeText={(text) => handleChange('scopeOfWorkDetails', text)}
              editable={isFormEditable}
            />
          </View>

          {/* Use or Character of Occupancy */}
          <Text style={styles.sectionHeader}>Use or Character of Occupancy</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.oneThirdInput]} placeholder="Group" value={formData.useOfOccupancyGroup} onChangeText={(text) => handleChange('useOfOccupancyGroup', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.oneThirdInput]} placeholder="Type" value={formData.useOfOccupancyType} onChangeText={(text) => handleChange('useOfOccupancyType', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.oneThirdInput]} placeholder="Others" value={formData.useOfOccupancyOthers} onChangeText={(text) => handleChange('useOfOccupancyOthers', text)} editable={isFormEditable} />
          </View>

          {/* Occupancy Classified / Building Permit Details */}
          <Text style={styles.sectionHeader}>Occupancy Classified</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Occupancy Classified" value={formData.occupancyClassified} onChangeText={(text) => handleChange('occupancyClassified', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Total Estimated Cost" value={formData.totalEstimatedCost} onChangeText={(text) => handleChange('totalEstimatedCost', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Number of Units" value={formData.numberUnits} onChangeText={(text) => handleChange('numberUnits', text)} keyboardType="numeric" editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Cost of Equipment Installed" value={formData.costEquipmentInstalled} onChangeText={(text) => handleChange('costEquipmentInstalled', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Number of Storey" value={formData.numberStorey} onChangeText={(text) => handleChange('numberStorey', text)} keyboardType="numeric" editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Building (Cost)" value={formData.costBuilding} onChangeText={(text) => handleChange('costBuilding', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Total Floor Area" value={formData.totalFloorArea} onChangeText={(text) => handleChange('totalFloorArea', text)} keyboardType="numeric" editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Electrical (Cost)" value={formData.costElectrical} onChangeText={(text) => handleChange('costElectrical', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Lot Area (sq.m)" value={formData.lotArea} onChangeText={(text) => handleChange('lotArea', text)} keyboardType="numeric" editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Mechanical (Cost)" value={formData.costMechanical} onChangeText={(text) => handleChange('costMechanical', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Electronics (Cost)" value={formData.costElectronics} onChangeText={(text) => handleChange('costElectronics', text)} keyboardType="numeric" editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Plumbing (Cost)" value={formData.costPlumbing} onChangeText={(text) => handleChange('costPlumbing', text)} keyboardType="numeric" editable={isFormEditable} />
          </View>


          {/* Proposed Date of Construction / Expected Date of Completion */}
          <Text style={styles.sectionHeader}>Proposed Date of Construction / Expected Date of Completion</Text>
          <View style={styles.inputRow}>
            {Platform.OS === 'web' ? (
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Proposed Date of Construction (YYYY-MM-DD)"
                value={formData.proposedDateCompletion}
                onChangeText={(text) => handleChange('proposedDateCompletion', text)}
                editable={isFormEditable}
              />
            ) : (
              <TouchableOpacity
                style={[styles.input, styles.halfInput, styles.datePickerButton]}
                onPress={() => isFormEditable && setShowProposedDatePicker(true)}
                disabled={!isFormEditable}
              >
                <Text style={formData.proposedDateCompletion ? styles.dateText : styles.datePlaceholder}>
                  {formData.proposedDateCompletion || 'Proposed Date of Construction'}
                </Text>
              </TouchableOpacity>
            )}
            {Platform.OS !== 'web' && showProposedDatePicker && isFormEditable && (
              <DateTimePicker
                value={formData.proposedDateCompletion ? new Date(formData.proposedDateCompletion) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'proposedDateCompletion', setShowProposedDatePicker)}
              />
            )}

            {Platform.OS === 'web' ? (
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Expected Date of Completion (YYYY-MM-DD)"
                value={formData.expectedDateCompletion}
                onChangeText={(text) => handleChange('expectedDateCompletion', text)}
                editable={isFormEditable}
              />
            ) : (
              <TouchableOpacity
                style={[styles.input, styles.halfInput, styles.datePickerButton]}
                onPress={() => isFormEditable && setShowExpectedDatePicker(true)}
                disabled={!isFormEditable}
              >
                <Text style={formData.expectedDateCompletion ? styles.dateText : styles.datePlaceholder}>
                  {formData.expectedDateCompletion || 'Expected Date of Completion'}
                </Text>
              </TouchableOpacity>
            )}
            {Platform.OS !== 'web' && showExpectedDatePicker && isFormEditable && (
              <DateTimePicker
                value={formData.expectedDateCompletion ? new Date(formData.expectedDateCompletion) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'expectedDateCompletion', setShowExpectedDatePicker)}
              />
            )}
          </View>

          {/* Architect or Civil Engineer Section */}
          <Text style={styles.sectionHeader}>Full-Time Inspector and Supervisor of Construction Works (Representing the Owner)</Text>
          <TextInput
            style={styles.input}
            placeholder="ARCHITECT OR CIVIL ENGINEER (Signed and Sealed Over Printed Name)"
            value={formData.architectEngineerName}
            onChangeText={(text) => handleChange('architectEngineerName', text)}
            editable={isFormEditable}
          />
          {Platform.OS === 'web' ? (
            <TextInput
              style={[styles.input, { textAlign: 'center' }]}
              placeholder="Date (YYYY-MM-DD)"
              value={formData.architectEngineerDateIssued}
              onChangeText={(text) => handleChange('architectEngineerDateIssued', text)}
              editable={isFormEditable}
            />
          ) : (
            <TouchableOpacity
              style={[styles.input, { textAlign: 'center' }, styles.datePickerButton]}
              onPress={() => isFormEditable && setShowArchitectEngineerDateIssuedPicker(true)}
              disabled={!isFormEditable}
            >
              <Text style={formData.architectEngineerDateIssued ? styles.dateText : styles.datePlaceholder}>
                {formData.architectEngineerDateIssued || 'Date'}
              </Text>
            </TouchableOpacity>
          )}
          {Platform.OS !== 'web' && showArchitectEngineerDateIssuedPicker && isFormEditable && (
            <DateTimePicker
              value={formData.architectEngineerDateIssued ? new Date(formData.architectEngineerDateIssued) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'architectEngineerDateIssued', setShowArchitectEngineerDateIssuedPicker)}
            />
          )}
          <Text style={styles.sublabel}>Date</Text>


          <Text style={styles.sectionHeader}>Architect or Civil Engineer</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.architectEngineerAddress}
            onChangeText={(text) => handleChange('architectEngineerAddress', text)}
            editable={isFormEditable}
          />
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="PRC No." value={formData.architectEngineerPRCNo} onChangeText={(text) => handleChange('architectEngineerPRCNo', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Validity" value={formData.architectEngineerValidity} onChangeText={(text) => handleChange('architectEngineerValidity', text)} editable={isFormEditable} />
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="PTR No." value={formData.architectEngineerPTRNo} onChangeText={(text) => handleChange('architectEngineerPTRNo', text)} editable={isFormEditable} />
            {Platform.OS === 'web' ? (
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Date Issued (YYYY-MM-DD)"
                value={formData.architectEngineerDateIssued}
                onChangeText={(text) => handleChange('architectEngineerDateIssued', text)}
                editable={isFormEditable}
              />
            ) : (
              <TouchableOpacity
                style={[styles.input, styles.halfInput, styles.datePickerButton]}
                onPress={() => isFormEditable && setShowArchitectEngineerDateIssuedPicker(true)} // Re-using this picker for the same field
                disabled={!isFormEditable}
              >
                <Text style={formData.architectEngineerDateIssued ? styles.dateText : styles.datePlaceholder}>
                  {formData.architectEngineerDateIssued || 'Date Issued'}
                </Text>
              </TouchableOpacity>
            )}
            {Platform.OS !== 'web' && showArchitectEngineerDateIssuedPicker && isFormEditable && (
              <DateTimePicker
                value={formData.architectEngineerDateIssued ? new Date(formData.architectEngineerDateIssued) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'architectEngineerDateIssued', setShowArchitectEngineerDateIssuedPicker)}
              />
            )}
          </View>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Issued at" value={formData.architectEngineerIssuedAt} onChangeText={(text) => handleChange('architectEngineerIssuedAt', text)} editable={isFormEditable} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="TIN" value={formData.architectEngineerTin} onChangeText={(text) => handleChange('architectEngineerTin', text)} editable={isFormEditable} />
          </View>

          {/* Applicant and Lot Owner/Authorized Representative Sections */}
          <View style={styles.signaturesRow}>
            <View style={styles.signatureColumn}>
              <Text style={styles.signatureLabel}>Applicant</Text>
              {/* The signature line for printing purposes */}
              <View style={styles.signatureLineInput}>
                <Text style={styles.signatureLineText}>{formData.applicantName}</Text>
              </View>
              <Text style={styles.sublabel}>(Signature Over Printed Name)</Text>
              {Platform.OS === 'web' ? (
                <TextInput
                  style={[styles.input, { textAlign: 'center', marginTop: 5 }]}
                  placeholder="Date (YYYY-MM-DD)"
                  value={formData.applicantDateIssued}
                  onChangeText={(text) => handleChange('applicantDateIssued', text)}
                  editable={isFormEditable}
                />
              ) : (
                <TouchableOpacity
                  style={[styles.input, { textAlign: 'center', marginTop: 5 }, styles.datePickerButton]}
                  onPress={() => isFormEditable && setShowApplicantIdDateIssuedPicker(true)} // Re-using this picker for applicant's date
                  disabled={!isFormEditable}
                >
                  <Text style={formData.applicantDateIssued ? styles.dateText : styles.datePlaceholder}>
                    {formData.applicantDateIssued || 'Date'}
                  </Text>
                </TouchableOpacity>
              )}
              {Platform.OS !== 'web' && showApplicantIdDateIssuedPicker && isFormEditable && (
                <DateTimePicker
                  value={formData.applicantDateIssued ? new Date(formData.applicantDateIssued) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'applicantDateIssued', setShowApplicantIdDateIssuedPicker)}
                />
              )}
              <Text style={styles.sublabel}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={formData.applicantAddress}
                onChangeText={(text) => handleChange('applicantAddress', text)}
                editable={isFormEditable}
              />
              <TextInput
                style={styles.input}
                placeholder="Gov't Issued ID No."
                value={formData.applicantGovtIdNo}
                onChangeText={(text) => handleChange('applicantGovtIdNo', text)}
                editable={isFormEditable}
              />
              <View style={styles.inputRow}>
                {Platform.OS === 'web' ? (
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Date Issued (YYYY-MM-DD)"
                    value={formData.applicantIdDateIssued}
                    onChangeText={(text) => handleChange('applicantIdDateIssued', text)}
                    editable={isFormEditable}
                  />
                ) : (
                  <TouchableOpacity
                    style={[styles.input, styles.halfInput, styles.datePickerButton]}
                    onPress={() => isFormEditable && setShowApplicantIdDateIssuedPicker(true)} // Re-using this picker for applicant's ID date
                    disabled={!isFormEditable}
                  >
                    <Text style={formData.applicantIdDateIssued ? styles.dateText : styles.datePlaceholder}>
                      {formData.applicantIdDateIssued || 'Date Issued'}
                    </Text>
                  </TouchableOpacity>
                )}
                {Platform.OS !== 'web' && showApplicantIdDateIssuedPicker && isFormEditable && (
                  <DateTimePicker
                    value={formData.applicantIdDateIssued ? new Date(formData.applicantIdDateIssued) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'applicantIdDateIssued', setShowApplicantIdDateIssuedPicker)}
                  />
                )}
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Place Issued" value={formData.applicantIdPlaceIssued} onChangeText={(text) => handleChange('applicantIdPlaceIssued', text)} editable={isFormEditable} />
              </View>
            </View>

            <View style={styles.signatureColumn}>
              <Text style={styles.signatureLabel}>Lot Owner/Authorized Representative</Text>
              {/* The signature line for printing purposes */}
              <View style={styles.signatureLineInput}>
                <Text style={styles.signatureLineText}>{formData.lotOwnerName}</Text>
              </View>
              <Text style={styles.sublabel}>(Signature Over Printed Name)</Text>
              {Platform.OS === 'web' ? (
                <TextInput
                  style={[styles.input, { textAlign: 'center', marginTop: 5 }]}
                  placeholder="Date (YYYY-MM-DD)"
                  value={formData.lotOwnerDate}
                  onChangeText={(text) => handleChange('lotOwnerDate', text)}
                  editable={isFormEditable}
                />
              ) : (
                <TouchableOpacity
                  style={[styles.input, { textAlign: 'center', marginTop: 5 }, styles.datePickerButton]}
                  onPress={() => isFormEditable && setShowLotOwnerDatePicker(true)}
                  disabled={!isFormEditable}
                >
                  <Text style={formData.lotOwnerDate ? styles.dateText : styles.datePlaceholder}>
                    {formData.lotOwnerDate || 'Date'}
                  </Text>
                </TouchableOpacity>
              )}
              {Platform.OS !== 'web' && showLotOwnerDatePicker && isFormEditable && (
                <DateTimePicker
                  value={formData.lotOwnerDate ? new Date(formData.lotOwnerDate) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'lotOwnerDate', setShowLotOwnerDatePicker)}
                />
              )}
              <Text style={styles.sublabel}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={formData.lotOwnerAddress}
                onChangeText={(text) => handleChange('lotOwnerAddress', text)}
                editable={isFormEditable}
              />
              <TextInput
                style={styles.input}
                placeholder="Gov't Issued ID No."
                value={formData.lotOwnerGovtIdNo}
                onChangeText={(text) => handleChange('lotOwnerGovtIdNo', text)}
                editable={isFormEditable}
              />
              <View style={styles.inputRow}>
                {Platform.OS === 'web' ? (
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Date Issued (YYYY-MM-DD)"
                    value={formData.lotOwnerIdDateIssued}
                    onChangeText={(text) => handleChange('lotOwnerIdDateIssued', text)}
                    editable={isFormEditable}
                  />
                ) : (
                  <TouchableOpacity
                    style={[styles.input, styles.halfInput, styles.datePickerButton]}
                    onPress={() => isFormEditable && setShowLotOwnerIdDateIssuedPicker(true)}
                    disabled={!isFormEditable}
                  >
                    <Text style={formData.lotOwnerIdDateIssued ? styles.dateText : styles.datePlaceholder}>
                      {formData.lotOwnerIdDateIssued || 'Date Issued'}
                    </Text>
                  </TouchableOpacity>
                )}
                {Platform.OS !== 'web' && showLotOwnerIdDateIssuedPicker && isFormEditable && (
                  <DateTimePicker
                    value={formData.lotOwnerIdDateIssued ? new Date(formData.lotOwnerIdDateIssued) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'lotOwnerIdDateIssued', setShowLotOwnerIdDateIssuedPicker)}
                  />
                )}
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Place Issued" value={formData.lotOwnerIdPlaceIssued} onChangeText={(text) => handleChange('lotOwnerIdPlaceIssued', text)} editable={isFormEditable} />
              </View>
            </View>
          </View>


          {/* Conditional Buttons */}
          {isFormEditable ? (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.printButton} onPress={printForm}>
                <Text style={styles.printButtonText}>Download Entire Form</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={handleShowUploadScreen}>
                <Text style={styles.uploadButtonText}>Upload Files</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.goBackButton} onPress={handleGoBackToEdit}>
                <Text style={styles.goBackButtonText}>Go Back to Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Check Icon SVG */}
            <CheckIcon style={styles.checkIcon} />
            <Text style={styles.modalTitle}>Application Complete!</Text>
            <Text style={styles.modalText}>Your Application Number is</Text>
            <Text style={styles.applicationNumber}>{applicationNumber}</Text>
            <Text style={styles.modalSubText}>
              You're all set! We've sent a copy of your application to your email.
              You can track your application status in your dashboard.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleContinue}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Check Icon SVG Component
const CheckIcon = ({ style }) => (
  <View style={style}>
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#28A745"/> {/* Green circle background */}
      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/> {/* White checkmark */}
    </svg>
  </View>
);


// Stylesheets for the UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  formContainer: {
    width: '95%',
    maxWidth: 700,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap', // Allow wrapping for smaller screens
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    flexShrink: 1, // Allow input to shrink
    width: '100%', // Default to full width
    marginBottom: 10, // Add margin to full-width inputs
  },
  halfInput: {
    width: '49%', // Roughly half, considering margin/padding
    marginBottom: 10,
  },
  quarterInput: {
    width: '24%',
    marginBottom: 10,
  },
  oneThirdInput: {
    width: '32%',
    marginBottom: 10,
  },
  twoThirdInput: { // For address field to align with 1/3
    width: '65%',
    marginBottom: 10,
  },
  radioGroup: { // Changed from checkboxGroup
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  radioItem: { // Changed from checkboxItem
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Space between items
    marginBottom: 10,
    flexShrink: 1, // Allow items to shrink on small screens
  },
  radioBox: { // Custom radio button outer circle
    height: 20,
    width: 20,
    borderRadius: 10, // Makes it a circle
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioChecked: { // Custom radio button when selected
    borderColor: '#007bff',
  },
  radioInnerCircle: { // Inner circle for selected radio button
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioLabel: { // Changed from checkboxLabel
    marginLeft: 5, // Adjust spacing as needed
    fontSize: 14,
    color: '#333',
  },
  checkboxItem: { // Retained for the enterprise checkbox
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
    flexShrink: 1,
  },
  checkboxLabel: { // Retained for the enterprise checkbox
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    maxWidth: 400,
  },
  checkIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#28A745', // Green color for success
  },
  modalText: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  applicationNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
  },
  modalSubText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  // Buttons for View Mode
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
    flexWrap: 'wrap', // Allow buttons to wrap on smaller screens
  },
  printButton: {
    backgroundColor: '#28a745', // Green color for print
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    minWidth: 150, // Ensure buttons don't get too small
    marginBottom: 10, // Add margin-bottom for wrapping
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#17a2b8', // Info blue color for upload
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    minWidth: 150,
    marginBottom: 10,
    shadowColor: '#17a2b8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#6c757d', // Grey color for go back
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    minWidth: 150,
    marginBottom: 10,
    shadowColor: '#6c757d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // New styles for signature column layout
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    flexWrap: 'wrap', // Allow wrapping for smaller screens
  },
  signatureColumn: {
    width: '49%', // Roughly half, considering margin/padding
    marginBottom: 10,
  },
  signatureLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  // Style for the signature line display in the UI and print
  signatureLineInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    marginBottom: 5,
    minHeight: 20, // Ensure it has some height even if empty
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signatureLineText: {
    fontSize: 14, // Same as input font size
    color: '#333',
    textAlign: 'center',
  },
  sublabel: { // For the small text under signature line
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  datePickerButton: {
    justifyContent: 'center', // Center text vertically
    minHeight: 44, // Make it easily tappable
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  datePlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  // Styles for the code block in the modal (not used in this version, but kept for reference)
  codeBlock: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', // Monospace font for code
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});