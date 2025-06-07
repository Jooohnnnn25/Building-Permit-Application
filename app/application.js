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
  Modal,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router"; // Import useRouter
import { Link } from "expo-router";


export default function PermitForm() {
  // Initialize router
  const router = useRouter();

  // State variables for form fields (add more as needed)
  const [isUnifiedForm, setIsUnifiedForm] = useState(true); // Example for section 1
  const [isNew, setIsNew] = useState(false);
  const [isRenewal, setIsRenewal] = useState(false);
  const [isLocationalClearance, setIsLocationalClearance] = useState(false);
  const [isComplex, setIsComplex] = useState(false);
  const [isAmendatory, setIsAmendatory] = useState(false);
  const [isFireSafetyEvaluationClearance, setIsFireSafetyEvaluationClearance] = useState(false);

  // Owner/Applicant Details
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [tin, setTin] = useState('');

  // Form of Ownership
  const [formOfOwnership, setFormOfOwnership] = useState(''); // E.g., LIMITED LIABILITY PARTNERSHIP

  // Address
  const [addressNo, setAddressNo] = useState('');
  const [street, setStreet] = useState('');
  const [cityMunicipality, setCityMunicipality] = useState('');
  const [province, setProvince] = useState('');
  const [barangay, setBarangay] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');

  // Location of Construction
  const [lotNo, setLotNo] = useState('');
  const [blkNo, setBlkNo] = useState('');
  const [tctNo, setTctNo] = useState('');
  const [currentTaxDecNo, setCurrentTaxDecNo] = useState('');
  const [streetConstruction, setStreetConstruction] = useState('');
  const [barangayConstruction, setBarangayConstruction] = useState('');
  const [cityMunicipalityConstruction, setCityMunicipalityConstruction] = useState('');

  // Scope of Work
  const [scopeOfType, setScopeOfType] = useState('');
  const [scopeOfDetails, setScopeOfDetails] = useState('');

  // User or Character of Occupancy
  const [userGroup, setUserGroup] = useState('');
  const [userType, setUserType] = useState('');
  const [userOthers, setUserOthers] = useState('');

  // User or Character of Occupancy (Table-like fields)
  const [occupancyClassified, setOccupancyClassified] = useState('');
  const [numberOfUnits, setNumberOfUnits] = useState('');
  const [numberOfStorey, setNumberOfStorey] = useState('');
  const [totalFloorArea, setTotalFloorArea] = useState('');
  const [lotArea, setLotArea] = useState('');

  // Total Estimated Cost
  const [buildingCost, setBuildingCost] = useState('');
  const [electricalCost, setElectricalCost] = useState('');
  const [mechanicalCost, setMechanicalCost] = useState('');
  const [electronicsCost, setElectronicsCost] = useState('');
  const [plumbingCost, setPlumbingCost] = useState('');

  // Cost of Equipment Installed
  const [equipmentInstalledBuilding, setEquipmentInstalledBuilding] = useState('');
  const [equipmentInstalledElectrical, setEquipmentInstalledElectrical] = useState('');
  const [equipmentInstalledMechanical, setEquipmentInstalledMechanical] = useState('');
  const [equipmentInstalledElectronics, setEquipmentInstalledElectronics] = useState('');
  const [equipmentInstalledPlumbing, setEquipmentInstalledPlumbing] = useState('');

  const [proposedDateOfConstruction, setProposedDateOfConstruction] = useState('');
  const [expectedDateOfCompletion, setExpectedDateOfCompletion] = useState('');

  // State for the pop-up
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [password, setPassword] = useState('');

  const generateRandomCredentials = () => {
    const appNum = Math.floor(10000000 + Math.random() * 90000000).toString();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApplicationNumber(appNum);
    setPassword(pass);
  };

  const handleSubmit = () => {
    console.log('Form Submitted!');
    const formData = {
      isNew, isRenewal, isLocationalClearance, isComplex, isAmendatory, isFireSafetyEvaluationClearance,
      lastName, firstName, middleInitial, tin,
      formOfOwnership,
      addressNo, street, cityMunicipality, province, barangay, contactNo, email,
      lotNo, blkNo, tctNo, currentTaxDecNo, streetConstruction, barangayConstruction, cityMunicipalityConstruction,
      scopeOfType, scopeOfDetails,
      userGroup, userType, userOthers,
      occupancyClassified, numberOfUnits, numberOfStorey, totalFloorArea, lotArea,
      buildingCost, electricalCost, mechanicalCost, electronicsCost, plumbingCost,
      equipmentInstalledBuilding, equipmentInstalledElectrical, equipmentInstalledMechanical, equipmentInstalledElectronics, equipmentInstalledPlumbing,
      proposedDateOfConstruction, expectedDateOfCompletion,
    };
    console.log(formData);

    generateRandomCredentials();
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false); // Close the modal
    // Navigate to the 'signatories' screen
    router.push('/signatories'); // This assumes signatories.js is at app/signatories.js
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSteps}>
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
          <Text style={styles.stepText}>Unified Form</Text>
        </View>
        <View style={styles.stepSeparator} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircleDisabled}><Text style={styles.stepNumber}>2</Text></View>
          <Text style={styles.stepTextDisabled}>Signatories Details</Text>
        </View>
        <View style={styles.stepSeparator} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircleDisabled}><Text style={styles.stepNumber}>3</Text></View>
          <Text style={styles.stepTextDisabled}>Review & Print</Text>
        </View>
      </View>

      <Text style={styles.formTitle}>UNIFIED APPLICATION FORM FOR BUILDING PERMIT</Text>

      {/* Checkboxes Section */}
      <View style={styles.section}>
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isNew ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsNew}
              value={isNew}
            />
            <Text style={styles.checkboxLabel}>New</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isRenewal ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsRenewal}
              value={isRenewal}
            />
            <Text style={styles.checkboxLabel}>Renewal</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isLocationalClearance ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsLocationalClearance}
              value={isLocationalClearance}
            />
            <Text style={styles.checkboxLabel}>Locational Clearance</Text>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isComplex ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsComplex}
              value={isComplex}
            />
            <Text style={styles.checkboxLabel}>Complex*</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isAmendatory ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsAmendatory}
              value={isAmendatory}
            />
            <Text style={styles.checkboxLabel}>Amendatory</Text>
          </View>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isFireSafetyEvaluationClearance ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsFireSafetyEvaluationClearance}
              value={isFireSafetyEvaluationClearance}
            />
            <Text style={styles.checkboxLabel}>Fire Safety Evaluation Clearance</Text>
          </View>
        </View>
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxItem}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isFireSafetyEvaluationClearance ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsFireSafetyEvaluationClearance}
              value={isFireSafetyEvaluationClearance}
            />
            <Text style={styles.checkboxLabel}>Representative</Text>
          </View>
        </View>
      </View>

      {/* Owner/Applicant Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Owner/Applicant</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputGroupSmall}>
            <Text style={styles.label}>M.I</Text>
            <TextInput
              style={styles.input}
              value={middleInitial}
              onChangeText={setMiddleInitial}
            />
          </View>
          <View style={styles.inputGroupSmall}>
            <Text style={styles.label}>TIN</Text>
            <TextInput
              style={styles.input}
              value={tin}
              onChangeText={setTin}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.checkboxRow}>
          <Text style={styles.checkboxLabel}>For Construction Owned By AM Enterprise</Text>
        </View>
      </View>

      {/* Form of Ownership */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form of Ownership</Text>
        <TextInput
          style={styles.input}
          value={formOfOwnership}
          onChangeText={setFormOfOwnership}
          placeholder="e.g., LIMITED LIABILITY PARTNERSHIP"
        />
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>No.</Text>
            <TextInput
              style={styles.input}
              value={addressNo}
              onChangeText={setAddressNo}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street</Text>
            <TextInput
              style={styles.input}
              value={street}
              onChangeText={setStreet}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City/Municipality</Text>
            <TextInput
              style={styles.input}
              value={cityMunicipality}
              onChangeText={setCityMunicipality}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Province</Text>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={province}
                  onValueChange={(itemValue, itemIndex) => setProvince(itemValue)}
                >
                  <Picker.Item label="Select Province" value="" />
                  <Picker.Item label="CAVITE" value="CAVITE" />
                  {/* Add more provinces */}
                </Picker>
              </View>
            ) : (
              <TextInput // Fallback for web if Picker styling is tricky
                style={styles.input}
                value={province}
                onChangeText={setProvince}
                placeholder="Province"
              />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Barangay</Text>
            <TextInput
              style={styles.input}
              value={barangay}
              onChangeText={setBarangay}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact No</Text>
            <TextInput
              style={styles.input}
              value={contactNo}
              onChangeText={setContactNo}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>
      </View>

      {/* Location of Construction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location of Construction</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lot No.</Text>
            <TextInput style={styles.input} value={lotNo} onChangeText={setLotNo} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>BLK No.</Text>
            <TextInput style={styles.input} value={blkNo} onChangeText={setBlkNo} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>TCT No.</Text>
            <TextInput style={styles.input} value={tctNo} onChangeText={setTctNo} keyboardType="numeric" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Tax Dec. No.</Text>
            <TextInput style={styles.input} value={currentTaxDecNo} onChangeText={setCurrentTaxDecNo} keyboardType="numeric" />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street</Text>
            <TextInput style={styles.input} value={streetConstruction} onChangeText={setStreetConstruction} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Barangay</Text>
            <TextInput style={styles.input} value={barangayConstruction} onChangeText={setBarangayConstruction} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City/Municipality</Text>
            <TextInput style={styles.input} value={cityMunicipalityConstruction} onChangeText={setCityMunicipalityConstruction} />
          </View>
        </View>
      </View>

      {/* Scope of Work */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scope of Work</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type</Text>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={scopeOfType}
                  onValueChange={(itemValue, itemIndex) => setScopeOfType(itemValue)}
                >
                  <Picker.Item label="Select Type" value="" />
                  <Picker.Item label="New Construction" value="New Construction" />
                  <Picker.Item label="Renovation" value="Renovation" />
                  {/* Add more types */}
                </Picker>
              </View>
            ) : (
              <TextInput style={styles.input} value={scopeOfType} onChangeText={setScopeOfType} placeholder="Type" />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Details</Text>
            <TextInput style={styles.input} value={scopeOfDetails} onChangeText={setScopeOfDetails} />
          </View>
        </View>
      </View>

      {/* User or Character of Occupancy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User or Character of Occupancy</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Group</Text>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={userGroup}
                  onValueChange={(itemValue, itemIndex) => setUserGroup(itemValue)}
                >
                  <Picker.Item label="Select Group" value="" />
                  <Picker.Item label="Residential" value="Residential" />
                  <Picker.Item label="Commercial" value="Commercial" />
                  {/* Add more groups */}
                </Picker>
              </View>
            ) : (
              <TextInput style={styles.input} value={userGroup} onChangeText={setUserGroup} placeholder="Group" />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type</Text>
            {Platform.OS === 'ios' || Platform.OS === 'android' ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={userType}
                  onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                >
                  <Picker.Item label="Select Type" value="" />
                  <Picker.Item label="Single Detached" value="Single Detached" />
                  <Picker.Item label="Apartment" value="Apartment" />
                  {/* Add more types */}
                </Picker>
              </View>
            ) : (
              <TextInput style={styles.input} value={userType} onChangeText={setUserType} placeholder="Type" />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Others</Text>
            <TextInput style={styles.input} value={userOthers} onChangeText={setUserOthers} />
          </View>
        </View>
      </View>

      {/* Occupancy Classified & Area Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User or Character of Occupancy</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Occupancy Classified</Text>
          <TextInput style={[styles.tableInput, { flex: 1.5 }]} value={occupancyClassified} onChangeText={setOccupancyClassified} />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Number of Units</Text>
          <TextInput style={styles.tableInput} value={numberOfUnits} onChangeText={setNumberOfUnits} keyboardType="numeric" />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Number of Storey</Text>
          <TextInput style={styles.tableInput} value={numberOfStorey} onChangeText={setNumberOfStorey} keyboardType="numeric" />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Total Floor Area</Text>
          <TextInput style={styles.tableInput} value={totalFloorArea} onChangeText={setTotalFloorArea} keyboardType="numeric" />
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Lot Area</Text>
          <TextInput style={styles.tableInput} value={lotArea} onChangeText={setLotArea} keyboardType="numeric" />
        </View>
      </View>

      {/* Estimated Costs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Estimated Cost</Text>
        <View style={styles.costRowHeader}>
          <Text style={[styles.costLabelHeader, { flex: 2 }]}>Type</Text>
          <Text style={styles.costLabelHeader}>Cost</Text>
          <Text style={styles.costLabelHeader}>Cost of Equipment Installed</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={[styles.costLabel, { flex: 2 }]}>Building</Text>
          <TextInput style={styles.costInput} value={buildingCost} onChangeText={setBuildingCost} keyboardType="numeric" />
          <TextInput style={styles.costInput} value={equipmentInstalledBuilding} onChangeText={setEquipmentInstalledBuilding} keyboardType="numeric" />
        </View>
        <View style={styles.costRow}>
          <Text style={[styles.costLabel, { flex: 2 }]}>Electrical</Text>
          <TextInput style={styles.costInput} value={electricalCost} onChangeText={setElectricalCost} keyboardType="numeric" />
          <TextInput style={styles.costInput} value={equipmentInstalledElectrical} onChangeText={setEquipmentInstalledElectrical} keyboardType="numeric" />
        </View>
        <View style={styles.costRow}>
          <Text style={[styles.costLabel, { flex: 2 }]}>Mechanical</Text>
          <TextInput style={styles.costInput} value={mechanicalCost} onChangeText={setMechanicalCost} keyboardType="numeric" />
          <TextInput style={styles.costInput} value={equipmentInstalledMechanical} onChangeText={setEquipmentInstalledMechanical} keyboardType="numeric" />
        </View>
        <View style={styles.costRow}>
          <Text style={[styles.costLabel, { flex: 2 }]}>Electronics</Text>
          <TextInput style={styles.costInput} value={electronicsCost} onChangeText={setElectronicsCost} keyboardType="numeric" />
          <TextInput style={styles.costInput} value={equipmentInstalledElectronics} onChangeText={setEquipmentInstalledElectronics} keyboardType="numeric" />
        </View>
        <View style={styles.costRow}>
          <Text style={[styles.costLabel, { flex: 2 }]}>Plumbing</Text>
          <TextInput style={styles.costInput} value={plumbingCost} onChangeText={setPlumbingCost} keyboardType="numeric" />
          <TextInput style={styles.costInput} value={equipmentInstalledPlumbing} onChangeText={setEquipmentInstalledPlumbing} keyboardType="numeric" />
        </View>
      </View>

      {/* Proposed Dates */}
      <View style={styles.section}>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Proposed Date of Construction</Text>
            <TextInput
              style={styles.input}
              value={proposedDateOfConstruction}
              onChangeText={setProposedDateOfConstruction}
              placeholder="YYYY-MM-DD" // You'd ideally use a date picker here
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expected Date of Completion</Text>
            <TextInput
              style={styles.input}
              value={expectedDateOfCompletion}
              onChangeText={setExpectedDateOfCompletion}
              placeholder="YYYY-MM-DD" // You'd ideally use a date picker here
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />{/* Spacer for scrolling */}

      {/* SUCCESS MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => {
          setShowSuccessModal(!showSuccessModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../assets/check_icon.png')}
              style={styles.checkIcon}
            />
            <Text style={styles.modalTitle}>Application Complete!</Text>
            <Text style={styles.modalText}>Your Application Number is</Text>
            <Text style={styles.applicationNumber}>{applicationNumber}</Text>
            <Text style={styles.modalText}>User Name: {applicationNumber}</Text>
            <Text style={styles.modalText}>Password: {password}</Text>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue} // This will now navigate using expo-router
            >
           
              <Link href="/signaroties" style={styles.continueButtonText} >Continue</Link>

            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleDisabled: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
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
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    minWidth: '45%',
    marginBottom: 15,
    marginHorizontal: 5,
  },
  inputGroupSmall: {
    width: '20%',
    marginBottom: 15,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 0 : 0,
    height: Platform.OS === 'ios' ? 45 : 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  tableInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  costRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  costLabelHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  costLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  costInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 15,
    marginLeft: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Styles for the Modal/Pop-up
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4CAF50',
  },
  modalText: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  applicationNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});