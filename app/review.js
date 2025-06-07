// app/review.js (or app/(tabs)/review.js if using tabs)

import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert, // Using Alert for user feedback
} from 'react-native';
import * as Print from 'expo-print'; // Import expo-print
// If you're passing data via router params, you might import `useLocalSearchParams`
// import { useLocalSearchParams } from "expo-router";

export default function ReviewScreen() {
  // If you're passing data from previous screens via router params, you'd access it like this:
  // const params = useLocalSearchParams();
  // const initialPermitFormData = params.permitFormData ? JSON.parse(params.permitFormData) : {};
  // const initialSignatoriesData = params.signatoriesData ? JSON.parse(params.signatoriesData) : {};

  // For now, we'll use placeholder data. In a real app, this would be `initialPermitFormData` and `initialSignatoriesData`.
  const [permitFormData, setPermitFormData] = useState({
    isNew: true,
    isRenewal: false,
    isLocationalClearance: true, // Added for review form based on image
    isComplex: false, // Added for review form based on image
    isAmendatory: false, // Added for review form based on image
    lastName: "DELA CRUZ",
    firstName: "JUAN",
    middleInitial: "P",
    tin: "123-456-789-000", // Added for review form based on image
    formOfOwnership: "SOLE PROPRIETORSHIP",
    addressNo: "123",
    street: "MAIN ST.",
    cityMunicipality: "LIBMANAN",
    province: "CAMARINES SUR",
    barangay: "POBLACION",
    contactNo: "09123456789",
    email: "juan.dela.cruz@example.com",
    lotNo: "456",
    blkNo: "7",
    tctNo: "T-123456",
    currentTaxDecNo: "TD-98765",
    streetConstruction: "BUILDING AVE.",
    barangayConstruction: "CENTERVILLE",
    cityMunicipalityConstruction: "LIBMANAN",
    scopeOfType: "New Construction",
    scopeOfDetails: "Residential Building",
    userGroup: "Residential",
    userType: "Single Detached",
    userOthers: "", // Added for review form based on image
    occupancyClassified: "Group A",
    numberOfUnits: "1",
    numberOfStorey: "2",
    totalFloorArea: "150",
    lotArea: "200",
    buildingCost: "1000000",
    electricalCost: "50000",
    mechanicalCost: "0",
    electronicsCost: "0",
    plumbingCost: "0",
    costOfEquipment: "0", // Added for review form based on image
    proposedDateOfConstruction: "2025-07-01",
    expectedDateOfCompletion: "2026-03-01",
  });

  const [signatoriesData, setSignatoriesData] = useState({
    inspectorLastName: "SAYRITAN",
    inspectorFirstName: "JULIAN MAE",
    inspectorMiddleInitial: "L",
    inspectorProfession: "architect", // could be 'engineer' or 'architect'
    inspectorAddress: "BACAGAY LIBMANAN",
    inspectorPrcNo: "0012345",
    inspectorValidity: "2026-12-31",
    inspectorPtrNo: "67890",
    inspectorDateIssued: "2024-01-15",
    inspectorIssuedAt: "MANILA",
    inspectorTin: "987-654-321-000",
    isLotNotOwnedByApplicant: true,
    applicantFullname: "JULIAN L. SAYRITAN",
    applicantAddress: "Blk 2 lot 7 Bembang Street Molino II Bacoor Cavite",
    applicantTypeofJD: "PhilHealth",
    applicantIdNumber: "987-654-321-123-456-789",
    applicantDateIssued: "2020-05-20",
    applicantPlaceIssued: "MAKATI",
  });

  // Generic handler to update form data
  const handlePermitFormChange = (field, value) => {
    setPermitFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSignatoriesChange = (field, value) => {
    setSignatoriesData(prevData => ({ ...prevData, [field]: value }));
  };

  // Helper function to render an editable form row
  const renderFormRow = (label, value, onChangeTextHandler, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={String(value || '')} // Ensure value is a string, handle null/undefined
        onChangeText={onChangeTextHandler}
        keyboardType={keyboardType}
        selectTextOnFocus={true} // Allows easy selection for editing
      />
    </View>
  );

  // Function to generate HTML content for printing
  const generatePrintHtml = () => {
    const formatValue = (value) => value !== null && value !== undefined ? value : 'N/A';
    const booleanToYesNo = (bool) => bool ? 'Yes' : 'No';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Building Permit Application Review</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          h1, h2, h3 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px; }
          .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
          .field-row { display: flex; flex-wrap: wrap; margin-bottom: 8px; }
          .field-label { font-weight: bold; width: 150px; flex-shrink: 0; }
          .field-value { flex-grow: 1; }
          .half-width { width: 48%; display: inline-block; vertical-align: top; margin-right: 1%; } /* For side-by-side fields */
          .full-width { width: 98%; }
          .header-text { text-align: center; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1 class="header-text">Building Permit Application Review</h1>

        <div class="section">
          <h2>UNIFIED APPLICATION FORM FOR BUILDING PERMIT</h2>
          <div class="field-row full-width">
              <span class="field-label">Type:</span>
              <span class="field-value">${formatValue(`${permitFormData.isNew ? 'New' : ''} ${permitFormData.isRenewal ? 'Renewal' : ''}`.trim())}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Locational Clearance:</span>
              <span class="field-value">${booleanToYesNo(permitFormData.isLocationalClearance)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Complex*:</span>
              <span class="field-value">${booleanToYesNo(permitFormData.isComplex)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Amendatory:</span>
              <span class="field-value">${booleanToYesNo(permitFormData.isAmendatory)}</span>
          </div>

          <h3>Owner/Applicant</h3>
          <div class="field-row half-width">
              <span class="field-label">Last Name:</span>
              <span class="field-value">${formatValue(permitFormData.lastName)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">First Name:</span>
              <span class="field-value">${formatValue(permitFormData.firstName)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">M.I:</span>
              <span class="field-value">${formatValue(permitFormData.middleInitial)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">TIN:</span>
              <span class="field-value">${formatValue(permitFormData.tin)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Form of Ownership:</span>
              <span class="field-value">${formatValue(permitFormData.formOfOwnership)}</span>
          </div>

          <h3>Address</h3>
          <div class="field-row half-width">
              <span class="field-label">No.:</span>
              <span class="field-value">${formatValue(permitFormData.addressNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Street:</span>
              <span class="field-value">${formatValue(permitFormData.street)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">City/Municipality:</span>
              <span class="field-value">${formatValue(permitFormData.cityMunicipality)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Province:</span>
              <span class="field-value">${formatValue(permitFormData.province)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Barangay:</span>
              <span class="field-value">${formatValue(permitFormData.barangay)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Contact No:</span>
              <span class="field-value">${formatValue(permitFormData.contactNo)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Email:</span>
              <span class="field-value">${formatValue(permitFormData.email)}</span>
          </div>

          <h3>Location of Construction</h3>
          <div class="field-row half-width">
              <span class="field-label">Lot No.:</span>
              <span class="field-value">${formatValue(permitFormData.lotNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">BLK No.:</span>
              <span class="field-value">${formatValue(permitFormData.blkNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">TCT No.:</span>
              <span class="field-value">${formatValue(permitFormData.tctNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Current Tax Dec. No.:</span>
              <span class="field-value">${formatValue(permitFormData.currentTaxDecNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Street:</span>
              <span class="field-value">${formatValue(permitFormData.streetConstruction)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Barangay:</span>
              <span class="field-value">${formatValue(permitFormData.barangayConstruction)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">City/Municipality:</span>
              <span class="field-value">${formatValue(permitFormData.cityMunicipalityConstruction)}</span>
          </div>

          <h3>Scope of Work</h3>
          <div class="field-row half-width">
              <span class="field-label">Type:</span>
              <span class="field-value">${formatValue(permitFormData.scopeOfType)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Details:</span>
              <span class="field-value">${formatValue(permitFormData.scopeOfDetails)}</span>
          </div>

          <h3>User or Character of Occupancy</h3>
          <div class="field-row half-width">
              <span class="field-label">Group:</span>
              <span class="field-value">${formatValue(permitFormData.userGroup)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Type:</span>
              <span class="field-value">${formatValue(permitFormData.userType)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Others:</span>
              <span class="field-value">${formatValue(permitFormData.userOthers)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Occupancy Classified:</span>
              <span class="field-value">${formatValue(permitFormData.occupancyClassified)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Number of Units:</span>
              <span class="field-value">${formatValue(permitFormData.numberOfUnits)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Number of Storey:</span>
              <span class="field-value">${formatValue(permitFormData.numberOfStorey)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Total Floor Area:</span>
              <span class="field-value">${formatValue(permitFormData.totalFloorArea)} sqm</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Lot Area:</span>
              <span class="field-value">${formatValue(permitFormData.lotArea)} sqm</span>
          </div>

          <h3>Total Estimated Cost</h3>
          <div class="field-row half-width">
              <span class="field-label">Building:</span>
              <span class="field-value">₱${formatValue(permitFormData.buildingCost)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Electrical:</span>
              <span class="field-value">₱${formatValue(permitFormData.electricalCost)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Mechanical:</span>
              <span class="field-value">₱${formatValue(permitFormData.mechanicalCost)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Electronics:</span>
              <span class="field-value">₱${formatValue(permitFormData.electronicsCost)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Plumbing:</span>
              <span class="field-value">₱${formatValue(permitFormData.plumbingCost)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Cost of Equipment Installed:</span>
              <span class="field-value">₱${formatValue(permitFormData.costOfEquipment)}</span>
          </div>

          <div class="field-row half-width">
              <span class="field-label">Proposed Date of Construction:</span>
              <span class="field-value">${formatValue(permitFormData.proposedDateOfConstruction)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Expected Date of Completion:</span>
              <span class="field-value">${formatValue(permitFormData.expectedDateOfCompletion)}</span>
          </div>
        </div>

        <div class="section">
          <h2>Inspectors Signatories</h2>
          <div class="field-row half-width">
              <span class="field-label">Last Name:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorLastName)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">First Name:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorFirstName)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">M.I:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorMiddleInitial)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Profession:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorProfession?.toUpperCase())}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Address:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorAddress)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">PRC No.:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorPrcNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Validity:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorValidity)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Date Issued:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorDateIssued)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">PTR No.:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorPtrNo)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Issued At:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorIssuedAt)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Tin:</span>
              <span class="field-value">${formatValue(signatoriesData.inspectorTin)}</span>
          </div>
        </div>

        <div class="section">
          <h2>Applicant</h2>
          <div class="field-row full-width">
              <span class="field-label">Lot Not Owned by Applicant:</span>
              <span class="field-value">${booleanToYesNo(signatoriesData.isLotNotOwnedByApplicant)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Fullname:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantFullname)}</span>
          </div>
          <div class="field-row full-width">
              <span class="field-label">Address:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantAddress)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Type of JD's:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantTypeofJD)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">ID Number:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantIdNumber)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Date Issued:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantDateIssued)}</span>
          </div>
          <div class="field-row half-width">
              <span class="field-label">Place Issued:</span>
              <span class="field-value">${formatValue(signatoriesData.applicantPlaceIssued)}</span>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handlePrint = async () => {
    try {
      const htmlContent = generatePrintHtml();

      await Print.printAsync({
        html: htmlContent,
        // You can also specify other options here like `uri` for PDF, `margins`, etc.
        // `printerUrl` can be used to select a specific printer if known.
      });
      // Optionally, you can add a success message or navigate after printing
      Alert.alert("Print Initiated", "Check your device's print dialog for options.");

    } catch (error) {
      console.error("Printing failed:", error);
      Alert.alert("Print Error", "Failed to initiate printing. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Step Header */}
      <View style={styles.headerSteps}>
        <View style={styles.stepContainer}>
          <View style={styles.stepCircleDone}><Text style={styles.stepNumber}>1</Text></View>
          <Text style={styles.stepTextDone}>Unified Form</Text>
        </View>
        <View style={styles.stepSeparatorDone} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircleDone}><Text style={styles.stepNumber}>2</Text></View>
          <Text style={styles.stepTextDone}>Signatories Details</Text>
        </View>
        <View style={styles.stepSeparatorDone} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}><Text style={styles.stepNumber}>3</Text></View>
          <Text style={styles.stepText}>Review & Print</Text>
        </View>
      </View>

      <Text style={styles.formTitle}>Review & Print</Text>

      {/* Unified Application Form Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UNIFIED APPLICATION FORM FOR BUILDING PERMIT</Text>

        <View style={styles.inputRow}>
            {renderFormRow('Type', `${permitFormData.isNew ? 'New' : ''} ${permitFormData.isRenewal ? 'Renewal' : ''}`.trim() || '', (text) => handlePermitFormChange('typeDisplay', text))}
            {renderFormRow('Locational Clearance', permitFormData.isLocationalClearance ? 'Yes' : 'No', (text) => handlePermitFormChange('isLocationalClearance', text === 'Yes'))}
            {renderFormRow('Complex*', permitFormData.isComplex ? 'Yes' : 'No', (text) => handlePermitFormChange('isComplex', text === 'Yes'))}
            {renderFormRow('Amendatory', permitFormData.isAmendatory ? 'Yes' : 'No', (text) => handlePermitFormChange('isAmendatory', text === 'Yes'))}
        </View>

        <Text style={styles.subsectionTitle}>Owner/Applicant</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Last Name', permitFormData.lastName, (text) => handlePermitFormChange('lastName', text))}
          {renderFormRow('First Name', permitFormData.firstName, (text) => handlePermitFormChange('firstName', text))}
          {renderFormRow('M.I', permitFormData.middleInitial, (text) => handlePermitFormChange('middleInitial', text))}
          {renderFormRow('TIN', permitFormData.tin, (text) => handlePermitFormChange('tin', text), 'numeric')}
        </View>
        {renderFormRow('Form of Ownership', permitFormData.formOfOwnership, (text) => handlePermitFormChange('formOfOwnership', text))}

        <Text style={styles.subsectionTitle}>Address</Text>
        <View style={styles.inputRow}>
          {renderFormRow('No.', permitFormData.addressNo, (text) => handlePermitFormChange('addressNo', text))}
          {renderFormRow('Street', permitFormData.street, (text) => handlePermitFormChange('street', text))}
          {renderFormRow('City/Municipality', permitFormData.cityMunicipality, (text) => handlePermitFormChange('cityMunicipality', text))}
          {renderFormRow('Province', permitFormData.province, (text) => handlePermitFormChange('province', text))}
          {renderFormRow('Barangay', permitFormData.barangay, (text) => handlePermitFormChange('barangay', text))}
          {renderFormRow('Contact No', permitFormData.contactNo, (text) => handlePermitFormChange('contactNo', text), 'phone-pad')}
          {renderFormRow('Email', permitFormData.email, (text) => handlePermitFormChange('email', text), 'email-address')}
        </View>

        <Text style={styles.subsectionTitle}>Location of Construction</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Lot No.', permitFormData.lotNo, (text) => handlePermitFormChange('lotNo', text))}
          {renderFormRow('BLK No.', permitFormData.blkNo, (text) => handlePermitFormChange('blkNo', text))}
          {renderFormRow('TCT No.', permitFormData.tctNo, (text) => handlePermitFormChange('tctNo', text))}
          {renderFormRow('Current Tax Dec. No.', permitFormData.currentTaxDecNo, (text) => handlePermitFormChange('currentTaxDecNo', text))}
        </View>
        <View style={styles.inputRow}>
          {renderFormRow('Street', permitFormData.streetConstruction, (text) => handlePermitFormChange('streetConstruction', text))}
          {renderFormRow('Barangay', permitFormData.barangayConstruction, (text) => handlePermitFormChange('barangayConstruction', text))}
          {renderFormRow('City/Municipality', permitFormData.cityMunicipalityConstruction, (text) => handlePermitFormChange('cityMunicipalityConstruction', text))}
        </View>

        <Text style={styles.subsectionTitle}>Scope of Work</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Type', permitFormData.scopeOfType, (text) => handlePermitFormChange('scopeOfType', text))}
          {renderFormRow('Details', permitFormData.scopeOfDetails, (text) => handlePermitFormChange('scopeOfDetails', text))}
        </View>

        <Text style={styles.subsectionTitle}>User or Character of Occupancy</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Group', permitFormData.userGroup, (text) => handlePermitFormChange('userGroup', text))}
          {renderFormRow('Type', permitFormData.userType, (text) => handlePermitFormChange('userType', text))}
          {renderFormRow('Others', permitFormData.userOthers, (text) => handlePermitFormChange('userOthers', text))}
        </View>
        <View style={styles.inputRow}>
          {renderFormRow('Occupancy Classified', permitFormData.occupancyClassified, (text) => handlePermitFormChange('occupancyClassified', text))}
          {renderFormRow('Number of Units', permitFormData.numberOfUnits, (text) => handlePermitFormChange('numberOfUnits', text), 'numeric')}
          {renderFormRow('Number of Storey', permitFormData.numberOfStorey, (text) => handlePermitFormChange('numberOfStorey', text), 'numeric')}
          {renderFormRow('Total Floor Area', permitFormData.totalFloorArea, (text) => handlePermitFormChange('totalFloorArea', text), 'decimal-pad')}
          {renderFormRow('Lot Area', permitFormData.lotArea, (text) => handlePermitFormChange('lotArea', text), 'decimal-pad')}
        </View>

        <Text style={styles.subsectionTitle}>Total Estimated Cost</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Building', permitFormData.buildingCost, (text) => handlePermitFormChange('buildingCost', text), 'decimal-pad')}
          {renderFormRow('Electrical', permitFormData.electricalCost, (text) => handlePermitFormChange('electricalCost', text), 'decimal-pad')}
          {renderFormRow('Mechanical', permitFormData.mechanicalCost, (text) => handlePermitFormChange('mechanicalCost', text), 'decimal-pad')}
          {renderFormRow('Electronics', permitFormData.electronicsCost, (text) => handlePermitFormChange('electronicsCost', text), 'decimal-pad')}
          {renderFormRow('Plumbing', permitFormData.plumbingCost, (text) => handlePermitFormChange('plumbingCost', text), 'decimal-pad')}
          {renderFormRow('Cost of Equipment Installed', permitFormData.costOfEquipment, (text) => handlePermitFormChange('costOfEquipment', text), 'decimal-pad')}
        </View>

        <View style={styles.inputRow}>
          {renderFormRow('Proposed Date of Construction', permitFormData.proposedDateOfConstruction, (text) => handlePermitFormChange('proposedDateOfConstruction', text))}
          {renderFormRow('Expected Date of Completion', permitFormData.expectedDateOfCompletion, (text) => handlePermitFormChange('expectedDateOfCompletion', text))}
        </View>
      </View>

      {/* Inspectors Signatories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inspectors Signatories</Text>
        <View style={styles.inputRow}>
          {renderFormRow('Last Name', signatoriesData.inspectorLastName, (text) => handleSignatoriesChange('inspectorLastName', text))}
          {renderFormRow('First Name', signatoriesData.inspectorFirstName, (text) => handleSignatoriesChange('inspectorFirstName', text))}
          {renderFormRow('M.I', signatoriesData.inspectorMiddleInitial, (text) => handleSignatoriesChange('inspectorMiddleInitial', text))}
          {renderFormRow('Profession', signatoriesData.inspectorProfession, (text) => handleSignatoriesChange('inspectorProfession', text))}
        </View>
        {renderFormRow('Address', signatoriesData.inspectorAddress, (text) => handleSignatoriesChange('inspectorAddress', text))}
        <View style={styles.inputRow}>
          {renderFormRow('PRC No.', signatoriesData.inspectorPrcNo, (text) => handleSignatoriesChange('inspectorPrcNo', text), 'numeric')}
          {renderFormRow('Validity', signatoriesData.inspectorValidity, (text) => handleSignatoriesChange('inspectorValidity', text))}
          {renderFormRow('Date Issued', signatoriesData.inspectorDateIssued, (text) => handleSignatoriesChange('inspectorDateIssued', text))}
        </View>
        <View style={styles.inputRow}>
          {renderFormRow('PTR No.', signatoriesData.inspectorPtrNo, (text) => handleSignatoriesChange('inspectorPtrNo', text), 'numeric')}
          {renderFormRow('Issued At', signatoriesData.inspectorIssuedAt, (text) => handleSignatoriesChange('inspectorIssuedAt', text))}
          {renderFormRow('Tin', signatoriesData.inspectorTin, (text) => handleSignatoriesChange('inspectorTin', text), 'numeric')}
        </View>
      </View>

      {/* Applicant Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Applicant</Text>
        {renderFormRow('Lot Not Owned by Applicant', signatoriesData.isLotNotOwnedByApplicant ? 'Yes' : 'No', (text) => handleSignatoriesChange('isLotNotOwnedByApplicant', text === 'Yes'))}
        <View style={styles.inputRow}>
            {renderFormRow('Fullname', signatoriesData.applicantFullname, (text) => handleSignatoriesChange('applicantFullname', text))}
            {renderFormRow('Address', signatoriesData.applicantAddress, (text) => handleSignatoriesChange('applicantAddress', text))}
        </View>
        <View style={styles.inputRow}>
          {renderFormRow('Type of ID', signatoriesData.applicantTypeofJD, (text) => handleSignatoriesChange('applicantTypeofJD', text))}
          {renderFormRow('ID Number', signatoriesData.applicantIdNumber, (text) => handleSignatoriesChange('applicantIdNumber', text), 'numeric')}
          {renderFormRow('Date Issued', signatoriesData.applicantDateIssued, (text) => handleSignatoriesChange('applicantDateIssued', text))}
          {renderFormRow('Place Issued', signatoriesData.applicantPlaceIssued, (text) => handleSignatoriesChange('applicantPlaceIssued', text))}
        </View>
      </View>

      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Text style={styles.printButtonText}>PRINT</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff', // Active color
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleDone: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50', // Green for done steps
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  stepTextDone: {
    marginTop: 5,
    fontSize: 12,
    color: '#4CAF50', // Green for done text
    fontWeight: 'bold',
  },
  stepSeparator: {
    width: 40,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  stepSeparatorDone: {
    width: 40,
    height: 1,
    backgroundColor: '#4CAF50', // Green for done separator
    marginHorizontal: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    color: '#555',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#666',
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 5, // Spacing between rows of inputs
  },
  inputGroup: {
    flex: 1,
    minWidth: '45%', // Two columns by default
    marginBottom: 10,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
    color: '#666',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333', // Ensure text color is visible
  },
  // Removed readOnlyInput as fields are now editable
  printButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});