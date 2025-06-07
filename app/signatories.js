// app/signatories.js

import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Make sure you have this installed: `npm install @react-native-picker/picker` or `yarn add @react-native-picker/picker`
import { useRouter } from "expo-router";

export default function SignatoriesScreen() {
  const router = useRouter();

  // State for Inspectors Signatories
  const [inspectorLastName, setInspectorLastName] = useState('');
  const [inspectorFirstName, setInspectorFirstName] = useState('');
  const [inspectorMiddleInitial, setInspectorMiddleInitial] = useState('');
  const [inspectorProfession, setInspectorProfession] = useState(null); // 'engineer' or 'architect'
  const [inspectorAddress, setInspectorAddress] = useState('');
  const [inspectorPrcNo, setInspectorPrcNo] = useState('');
  const [inspectorValidity, setInspectorValidity] = useState('');
  const [inspectorPtrNo, setInspectorPtrNo] = useState('');
  const [inspectorDateIssued, setInspectorDateIssued] = useState('');
  const [inspectorIssuedAt, setInspectorIssuedAt] = useState('');
  const [inspectorTin, setInspectorTin] = useState('');

  // State for Lot Ownership
  const [isLotNotOwnedByApplicant, setIsLotNotOwnedByApplicant] = useState(false);

  // State for Applicant (if different from Owner/Applicant)
  const [applicantFullname, setApplicantFullname] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [applicantTypeofJD, setApplicantTypeofJD] = useState(''); // e.g., PhilHealth
  const [applicantIdNumber, setApplicantIdNumber] = useState('');
  const [applicantDateIssued, setApplicantDateIssued] = useState('');
  const [applicantPlaceIssued, setApplicantPlaceIssued] = useState('');


  const handleSubmit = () => {
    // Collect all signatory details
    const signatoryData = {
      inspectorLastName,
      inspectorFirstName,
      inspectorMiddleInitial,
      inspectorProfession,
      inspectorAddress,
      inspectorPrcNo,
      inspectorValidity,
      inspectorPtrNo,
      inspectorDateIssued,
      inspectorIssuedAt,
      inspectorTin,
      isLotNotOwnedByApplicant,
      applicantFullname,
      applicantAddress,
      applicantTypeofJD,
      applicantIdNumber,
      applicantDateIssued,
      applicantPlaceIssued,
    };
    console.log('Signatory Data:', signatoryData);

    // In a real application, you'd likely send this data to a backend
    // or store it locally (e.g., using Context API or Redux)
    // before navigating to the next step.

    // Navigate to the Review & Print screen
    // If you're using tabs, change this to `router.push('/tabs/review');`
    router.push('/review');
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
          <View style={styles.stepCircle}><Text style={styles.stepNumber}>2</Text></View>
          <Text style={styles.stepText}>Signatories Details</Text>
        </View>
        <View style={styles.stepSeparator} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircleDisabled}><Text style={styles.stepNumber}>3</Text></View>
          <Text style={styles.stepTextDisabled}>Review & Print</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Inspectors Signatories</Text>
      <View style={styles.section}>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={inspectorLastName} onChangeText={setInspectorLastName} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={inspectorFirstName} onChangeText={setInspectorFirstName} />
          </View>
          <View style={styles.inputGroupSmall}>
            <Text style={styles.label}>M.I</Text>
            <TextInput style={styles.input} value={inspectorMiddleInitial} onChangeText={setInspectorMiddleInitial} />
          </View>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setInspectorProfession('engineer')}
            >
              <View style={styles.radioCircle}>
                {inspectorProfession === 'engineer' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioLabel}>Engineer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setInspectorProfession('architect')}
            >
              <View style={styles.radioCircle}>
                {inspectorProfession === 'architect' && <View style={styles.selectedRadioCircle} />}
              </View>
              <Text style={styles.radioLabel}>Architect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={inspectorAddress} onChangeText={setInspectorAddress} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PRC No.</Text>
            <TextInput style={styles.input} value={inspectorPrcNo} onChangeText={setInspectorPrcNo} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Validity</Text>
            <TextInput style={styles.input} value={inspectorValidity} onChangeText={setInspectorValidity} placeholder="YYYY-MM-DD" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date Issued</Text>
            <TextInput style={styles.input} value={inspectorDateIssued} onChangeText={setInspectorDateIssued} placeholder="YYYY-MM-DD" />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PTR No.</Text>
            <TextInput style={styles.input} value={inspectorPtrNo} onChangeText={setInspectorPtrNo} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Issued At</Text>
            <TextInput style={styles.input} value={inspectorIssuedAt} onChangeText={setInspectorIssuedAt} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tin</Text>
            <TextInput style={styles.input} value={inspectorTin} onChangeText={setInspectorTin} keyboardType="numeric" />
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.checkboxSection]}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isLotNotOwnedByApplicant ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsLotNotOwnedByApplicant}
          value={isLotNotOwnedByApplicant}
        />
        <Text style={styles.checkboxLabel}>Lot Not Owned by the Applicant</Text>
      </View>

      <Text style={styles.sectionTitle}>Applicant</Text>
      <View style={styles.section}>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fullname</Text>
            <TextInput style={styles.input} value={applicantFullname} onChangeText={setApplicantFullname} />
          </View>
          <View style={styles.inputGroupFull}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={applicantAddress} onChangeText={setApplicantAddress} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroupSmall}>
            <Text style={styles.label}>Type of JD's</Text>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={applicantTypeofJD}
                  onValueChange={(itemValue, itemIndex) => setApplicantTypeofJD(itemValue)}
                >
                  <Picker.Item label="PhilHealth" value="PhilHealth" />
                  <Picker.Item label="SSS" value="SSS" />
                  <Picker.Item label="Pag-IBIG" value="Pag-IBIG" />
                  {/* Add more types of JDs */}
                </Picker>
              </View>
            ) : (
              <TextInput style={styles.input} value={applicantTypeofJD} onChangeText={setApplicantTypeofJD} placeholder="e.g., PhilHealth" />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ID Number</Text>
            <TextInput style={styles.input} value={applicantIdNumber} onChangeText={setApplicantIdNumber} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date Issued</Text>
            <TextInput style={styles.input} value={applicantDateIssued} onChangeText={setApplicantDateIssued} placeholder="YYYY-MM-DD" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Place Issued</Text>
            <TextInput style={styles.input} value={applicantPlaceIssued} onChangeText={setApplicantPlaceIssued} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />{/* Spacer for scrolling */}
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
  // Styles for active/done steps
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
  stepCircleDisabled: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc', // Disabled color
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
  stepTextDisabled: {
    marginTop: 5,
    fontSize: 12,
    color: '#777',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    color: '#555',
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
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 5, // Reduce margin between rows
  },
  inputGroup: {
    flex: 1,
    minWidth: '30%', // Adjust for 3 columns
    marginBottom: 10, // Adjust spacing
    marginHorizontal: 5,
  },
  inputGroupSmall: {
    width: '15%', // For M.I.
    marginBottom: 10,
    marginHorizontal: 5,
  },
  inputGroupFull: {
    flex: 1, // Takes full width
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
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allows it to take up space in the row
    minWidth: '40%', // Adjust as needed
    justifyContent: 'space-around', // Distribute items
    marginBottom: 10,
    marginHorizontal: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRadioCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 15,
    color: '#333',
  },
  checkboxSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 0 : 0,
    height: Platform.OS === 'ios' ? 45 : 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});